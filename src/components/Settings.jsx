import { useState } from "react";
import { Mail, Trash2, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getEmail, setEmail, clearAllPhotos, getPhotos, getTriggerThreshold, setTriggerThreshold, getEmailWebhook, setEmailWebhook } from "@/utils/storage";
import { capturePhoto } from "@/utils/capture";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [currentEmail, setCurrentEmail] = useState(getEmail());
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [isTestingCamera, setIsTestingCamera] = useState(false);
  const [threshold, setThreshold] = useState(getTriggerThreshold());
  const [webhook, setWebhook] = useState(getEmailWebhook());

  const handleUpdateEmail = () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setEmail(newEmail);
    setCurrentEmail(newEmail);
    toast({
      title: "Email Updated",
      description: "Your registered email has been updated successfully.",
    });
  };

  const handleUpdateThreshold = () => {
    const n = parseInt(threshold, 10) || 2;
    setTriggerThreshold(n);
    toast({ title: 'Trigger Updated', description: `Capture will trigger after ${n} incorrect attempt${n!==1? 's' : ''}.` });
  };

  const handleUpdateWebhook = () => {
    setEmailWebhook(webhook);
    toast({ title: 'Webhook Updated', description: webhook ? 'Webhook URL saved.' : 'Webhook cleared.' });
  };

  const handleClearPhotos = () => {
    clearAllPhotos();
    toast({
      title: "Photos Cleared",
      description: "All intruder photos have been deleted.",
    });
  };

  const handleTestCamera = async () => {
    setIsTestingCamera(true);
    try {
      await capturePhoto();
      toast({
        title: "Camera Test Successful",
        description: "Your camera is working correctly!",
      });
    } catch (error) {
      toast({
        title: "Camera Test Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsTestingCamera(false);
    }
  };

  const photoCount = getPhotos().length;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Email Settings */}
        <Card className="shadow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Configuration
            </CardTitle>
            <CardDescription>
              Update the email address where intruder alerts will be sent (simulated).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Registered Email
              </label>
              <Input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <Button 
              onClick={handleUpdateEmail}
              disabled={newEmail === currentEmail}
            >
              <Save className="h-4 w-4 mr-2" />
              Update Email
            </Button>
          </CardContent>
        </Card>

        {/* Trigger Threshold */}
        <Card className="shadow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Capture Threshold
            </CardTitle>
            <CardDescription>
              Number of consecutive wrong password attempts required to trigger a capture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input type="number" min={1} value={threshold} onChange={(e) => setThreshold(e.target.value)} />
              <Button onClick={handleUpdateThreshold}>Save</Button>
            </div>
          </CardContent>
        </Card>

        {/* Webhook / Email Endpoint */}
        <Card className="shadow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Webhook (optional)
            </CardTitle>
            <CardDescription>
              Optional endpoint to receive captured images (POST JSON). If empty, email sending is simulated locally.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input value={webhook} onChange={(e) => setWebhook(e.target.value)} placeholder="https://example.com/webhook" />
              <Button onClick={handleUpdateWebhook} className="mt-2">Save Webhook</Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Test */}
        <Card className="shadow-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Camera Test
            </CardTitle>
            <CardDescription>
              Test your camera to ensure intruder capture is working correctly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleTestCamera}
              disabled={isTestingCamera}
              variant="secondary"
            >
              <Camera className="h-4 w-4 mr-2" />
              {isTestingCamera ? "Testing Camera..." : "Test Camera"}
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="shadow-alert">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Permanently delete all captured intruder photos from your device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={photoCount === 0}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Photos ({photoCount})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {photoCount} intruder photo{photoCount !== 1 ? 's' : ''} from your device. 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearPhotos} className="bg-destructive text-destructive-foreground">
                    Delete All Photos
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">🔒 Privacy & Data</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              • All data is stored locally in your browser using localStorage
            </p>
            <p>
              • No information is sent to external servers
            </p>
            <p>
              • Email alerts are simulated for demonstration purposes
            </p>
            <p>
              • Camera permissions are only requested when capturing photos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
