import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AccessGranted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-success">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-6 rounded-full bg-gradient-success">
              <CheckCircle2 className="h-16 w-16 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[hsl(var(--success))]">
              Access Granted
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Your credentials have been verified.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={() => navigate('/gallery')}
              variant="success"
              className="w-full"
            >
              View Gallery
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/settings')}
              variant="secondary"
              className="w-full"
            >
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessGranted;
