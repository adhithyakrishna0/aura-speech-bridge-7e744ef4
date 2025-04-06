
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassesDisplay from '@/components/GlassesDisplay';
import ModeSelector from '@/components/ModeSelector';
import SpeechInterface from '@/components/SpeechInterface';
import ProgressDashboard from '@/components/ProgressDashboard';
import GlassesAnimation from '@/components/GlassesAnimation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Glasses, Info, Video } from 'lucide-react';

const Index = () => {
  const [activeMode, setActiveMode] = useState('assist');
  const [displayText, setDisplayText] = useState('Hello, how can I assist you today?');
  const [showAnimation, setShowAnimation] = useState(false);

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
    
    // Update display text based on selected mode
    switch(mode) {
      case 'study':
        setDisplayText('Study Mode activated. I can help with note-taking and classroom interactions.');
        break;
      case 'assist':
        setDisplayText('Assist Mode active. I\'m ready to help with everyday conversations.');
        break;
      case 'speech':
        setDisplayText('Speech Disability Mode enabled. Enhanced speech prediction activated.');
        break;
      case 'advanced':
        setDisplayText('Advanced Communication Mode active. EEG monitoring enabled for non-verbal assistance.');
        break;
      default:
        setDisplayText('Hello, how can I assist you today?');
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <section className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">AuraSpeech Bridge</h1>
            <p className="text-muted-foreground">
              Smart Glasses for Speech & Communication Assistance
            </p>
          </div>
          
          {showAnimation ? (
            <GlassesAnimation />
          ) : (
            <GlassesDisplay text={displayText} mode={activeMode} />
          )}
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setShowAnimation(!showAnimation)}
              className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {showAnimation ? (
                <>
                  <Glasses size={16} />
                  <span>Show Interface Demo</span>
                </>
              ) : (
                <>
                  <Video size={16} />
                  <span>Show 3D Animation</span>
                </>
              )}
            </button>
          </div>
        </section>

        {!showAnimation && (
          <>
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Select Communication Mode</h2>
              <ModeSelector activeMode={activeMode} onModeChange={handleModeChange} />
            </section>
            
            <section className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold">Speech Interface</h2>
                <div className="ml-auto flex space-x-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>Microphone Active</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    <span>AI Connected</span>
                  </div>
                </div>
              </div>
              <SpeechInterface onSpeechChange={setDisplayText} activeMode={activeMode} />
            </section>
          </>
        )}
        
        <section>
          <Tabs defaultValue={showAnimation ? "animation" : "dashboard"}>
            <TabsList className="mb-4">
              {showAnimation && (
                <TabsTrigger value="animation" className="flex items-center">
                  <Video size={16} className="mr-2" />
                  Animation Info
                </TabsTrigger>
              )}
              <TabsTrigger value="dashboard" className="flex items-center">
                <Brain size={16} className="mr-2" />
                Progress Dashboard
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center">
                <Info size={16} className="mr-2" />
                About The Project
              </TabsTrigger>
            </TabsList>
            
            {showAnimation && (
              <TabsContent value="animation">
                <div className="bg-card shadow-sm border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">About This Animation</h2>
                  <p className="text-muted-foreground mb-4">
                    This 20-second animation showcases the AuraSpeech Bridge smart glasses with a revolving camera angle, 
                    highlighting the sleek design and key features of our communication assistance technology.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-medium mb-2">Animation Features</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>360° revolving view of the product</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>20-second complete rotation cycle</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>Interactive controls for manual adjustment</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span>Progress tracking along the animation timeline</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Product Highlights</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                          <span>Sleek, minimalist frame design</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                          <span>Integrated transparent OLED display</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                          <span>EEG sensor for brainwave detection</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                          <span>Lightweight yet durable construction</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="dashboard">
              <ProgressDashboard />
            </TabsContent>
            
            <TabsContent value="about">
              <div className="bg-card shadow-sm border rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Glasses size={32} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">About AuraSpeech Bridge</h2>
                    <p className="text-muted-foreground mb-4">
                      AuraSpeech Bridge is an innovative smart glasses project designed to assist people 
                      with speech disabilities or communication challenges in social and public settings.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-medium mb-2">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Real-time speech prediction and display on transparent OLED</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>EEG sensor integration for non-verbal communication</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Multiple specialized assistance modes</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Lightweight and powered by a connected mobile device</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                        <span>Advanced AI for natural language processing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Technologies Used</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                        <span>TensorFlow/PyTorch for AI and EEG signal processing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                        <span>Google Gemini API for advanced NLP and predictions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                        <span>Cloud processing for database and user tracking</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                        <span>Bluetooth/Wi-Fi for device communication</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-2"></div>
                        <span>Transparent OLED display technology</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Future Development</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {[
                      "Multilingual support",
                      "Facial emotion recognition",
                      "Enhanced EEG detection",
                      "Augmented reality integration",
                      "Custom voice synthesis",
                      "Situational context awareness"
                    ].map((feature, index) => (
                      <div key={index} className="bg-muted p-2 rounded">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
