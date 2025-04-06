import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VideoExporterProps {
  targetRef: React.RefObject<HTMLDivElement>;
  duration: number;
  fileName?: string;
}

const VideoExporter = ({ targetRef, duration, fileName = 'glasses-animation' }: VideoExporterProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    if (!targetRef.current) {
      toast.error("Nothing to record. Please ensure the animation is visible.");
      return;
    }

    try {
      setIsRecording(true);
      setProgress(0);
      chunksRef.current = [];

      const stream = targetRef.current.querySelector('canvas')?.captureStream() || 
                      await navigator.mediaDevices.getDisplayMedia({
                        video: { 
                          displaySurface: "browser"
                        },
                        audio: false
                      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.mp4`;
        a.click();
        
        // Clean up
        URL.revokeObjectURL(url);
        if ('getDisplayMedia' in navigator.mediaDevices) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        setIsRecording(false);
        setProgress(0);
        toast.success("Video downloaded successfully!");
      };
      
      mediaRecorder.start();
      
      // Show progress and stop after duration
      const interval = 100; // Update progress every 100ms
      let elapsed = 0;
      
      const progressTimer = setInterval(() => {
        elapsed += interval;
        const newProgress = Math.min((elapsed / (duration * 1000)) * 100, 100);
        setProgress(newProgress);
        
        if (elapsed >= duration * 1000) {
          clearInterval(progressTimer);
          mediaRecorder.stop();
        }
      }, interval);
      
    } catch (error) {
      console.error("Error recording video:", error);
      setIsRecording(false);
      toast.error("Failed to start recording. Please try again or use screen recording software.");
    }
  };
  
  // Clean up if component unmounts during recording
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="my-4">
      <Button 
        onClick={startRecording} 
        disabled={isRecording}
        className="flex items-center gap-2"
      >
        {isRecording ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Recording ({Math.round(progress)}%)
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Export as Video
          </>
        )}
      </Button>
      
      {isRecording && (
        <div className="w-full bg-secondary/30 h-2 mt-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-2">
        {isRecording 
          ? "Recording in progress. Please don't navigate away from this page."
          : "This will create a video file of the current animation."}
      </p>
    </div>
  );
};

export default VideoExporter;
