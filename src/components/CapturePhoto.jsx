import { useState, useEffect } from "react";
import { Camera, AlertTriangle } from "lucide-react";
import { capturePhoto, checkCameraPermission } from "@/utils/capture";
import { addPhoto } from "@/utils/storage";
import { sendImageToEmail } from "@/utils/email";
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
      const hasPermission = await checkCameraPermission();
      if (!hasPermission) {
        throw new Error('Camera permission not granted');
      }

      const imageData = await capturePhoto();
      const photo = addPhoto(imageData);
      setCapturedImage(imageData);

      toast({
        title: "⚠️ Intruder Detected!",
        description: "Photo captured and logged successfully.",
        variant: "destructive",
      });

      // Attempt to send to registered email (or webhook). This runs but we don't block UI.
      sendImageToEmail(photo).then((res) => {
        if (res && res.success) {
          // Optionally notify success (quiet)
        } else {
          // Log failure toasts if needed
          toast({
            title: 'Email Send Failed',
            description: res && res.error ? String(res.error) : 'Unknown error',
            variant: 'destructive',
          });
        }
      }).catch((e) => {
        console.error('Email send error', e);
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
