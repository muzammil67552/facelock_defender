import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, Mail, Image, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getEmail } from "@/utils/storage";

const IntruderDetected = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const capturedPhoto = location.state?.photo;
  const email = getEmail();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-alert">
        <CardContent className="pt-12 pb-8 space-y-6">
          {/* Alert Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-gradient-alert animate-pulse-glow">
                <AlertTriangle className="h-16 w-16 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-destructive">
                ⚠️ Intruder Detected
              </h1>
              <p className="text-muted-foreground">
                Unauthorized access attempt has been logged
              </p>
            </div>
          </div>

          {/* Photo Preview */}
          {capturedPhoto && (
            <div className="space-y-3">
              <div className="rounded-lg overflow-hidden border-2 border-destructive">
                <img 
                  src={capturedPhoto.imageData} 
                  alt="Captured intruder" 
                  className="w-full h-auto"
                />
              </div>
              <div className="text-sm text-center text-muted-foreground">
                Captured: {formatDate(capturedPhoto.timestamp)}
              </div>
            </div>
          )}

          {/* Alert Details */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span className="font-medium">Alert sent to:</span>
              <span className="text-muted-foreground">{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Image className="h-4 w-4 text-primary" />
              <span className="font-medium">Photo saved to gallery</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={() => navigate('/gallery')}
              variant="alert"
              className="w-full"
            >
              View All Captures
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="secondary"
              className="w-full"
            >
              Return to Login
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            This is a simulated security system. In a real implementation, the photo would be sent to your email and stored securely.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntruderDetected;
