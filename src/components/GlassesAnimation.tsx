
import React, { useEffect, useState } from 'react';
import { ArrowLeftRight, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GlassesAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Animation loop for rotation
  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (isPlaying && autoRotate) {
        // Rotate 18 degrees per second (complete 360° rotation in 20 seconds)
        const delta = (elapsed / 1000) * 18;
        setRotation((prev) => (prev + delta) % 360);
      }
      
      lastTimestamp = timestamp;
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, autoRotate]);
  
  // Get the appropriate image based on rotation angle
  const getDisplayImage = () => {
    // Simplified logic - in reality would need more images for smoother rotation
    if (rotation >= 0 && rotation < 120) {
      return "/lovable-uploads/86538c16-f718-47bc-8a9d-91e331e3269b.png";
    } else if (rotation >= 120 && rotation < 240) {
      return "/lovable-uploads/b6e90d6b-a88e-4696-a334-f9ae44036360.png";
    } else {
      return "/lovable-uploads/4ff6eac8-be19-4d1e-9344-86f0f277de4b.png";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
        
        {/* Rotating Platform */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ 
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Product display */}
          <div 
            className="relative"
            style={{ 
              transform: 'translateZ(100px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <img 
              src={getDisplayImage()} 
              alt="AuraSpeech Bridge Smart Glasses" 
              className="max-h-[70vh] max-w-full object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(var(--primary), 0.3))',
              }}
            />
          </div>
        </div>
        
        {/* Overlay info */}
        <div className="absolute top-4 left-4 text-primary-foreground text-sm font-medium">
          AuraSpeech Bridge
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-primary-foreground text-sm font-medium mb-1">
            Smart Glasses for Communication Assistance
          </div>
          <div className="h-1 w-full bg-black/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(rotation / 360) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setRotation(0)}
        >
          <RotateCcw size={16} />
        </Button>
        
        <Button 
          variant={autoRotate ? "default" : "outline"}
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center space-x-1"
        >
          <ArrowLeftRight size={16} />
          <span>Auto-Rotate</span>
        </Button>
      </div>
      
      <p className="text-center text-muted-foreground text-sm mt-4">
        20-second full revolution animation showcasing the AuraSpeech Bridge smart glasses
      </p>
    </div>
  );
};

export default GlassesAnimation;
