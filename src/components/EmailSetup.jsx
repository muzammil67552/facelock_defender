import { useState } from "react";
import { Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { checkCameraPermission } from "@/utils/capture";

const EmailSetup = ({ onEmailSet }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    (async () => {
      // Try to ensure camera permission is available during setup
      const hasCamera = await checkCameraPermission();
      if (!hasCamera) {
        toast({
          title: "Camera Permission Required",
          description: "This app needs camera access to capture intruder photos. Please allow camera access and try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Simulate short setup delay
      setTimeout(() => {
        onEmailSet(email);
        toast({
          title: "Email Registered",
          description: "Your security system is now active!",
        });
        setIsLoading(false);
      }, 400);
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-primary">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-primary">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to SecureWatch</CardTitle>
          <CardDescription className="text-base">
            Set up your security monitoring system. Enter your email to receive intruder alerts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Setting up..." : "Activate Security System"}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              🔒 All data is stored locally on your device. No information is sent to external servers.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSetup;
