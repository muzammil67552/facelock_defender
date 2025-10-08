import { useState, useEffect } from "react";
import { Camera, AlertTriangle } from "lucide-react";
import { capturePhoto } from "@/utils/capture";
import { addPhoto } from "@/utils/storage";
import { toast } from "@/hooks/use-toast";

const CapturePhoto = ({ onCaptureDone }) => {
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    performCapture();
  }, []);

  const performCapture = async () => {
    setCapturing(true);
    try {
      const imageData = await capturePhoto();
      const photo = addPhoto(imageData);
      setCapturedImage(imageData);
      
      toast({
        title: "⚠️ Intruder Detected!",
        description: "Photo captured and logged successfully.",
        variant: "destructive",
      });

      setTimeout(() => {
        onCaptureDone(photo);
      }, 2000);
    } catch (error) {
      toast({
        title: "Camera Error",
        description: error.message,
        variant: "destructive",
      });
      onCaptureDone(null);
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-gradient-alert animate-pulse-glow">
            {capturing ? (
              <Camera className="h-12 w-12 text-white animate-pulse" />
            ) : (
              <AlertTriangle className="h-12 w-12 text-white" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-destructive">
            {capturing ? "Capturing Intruder..." : "Intruder Detected!"}
          </h2>
          <p className="text-muted-foreground">
            {capturing 
              ? "Please wait while we secure the evidence..."
              : "Photo captured successfully"}
          </p>
        </div>

        {capturedImage && (
          <div className="rounded-lg overflow-hidden border-2 border-destructive shadow-alert">
            <img 
              src={capturedImage} 
              alt="Captured intruder" 
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CapturePhoto;
