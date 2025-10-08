import { useState } from "react";
import { Trash2, Image as ImageIcon, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { getPhotos, deletePhoto } from "@/utils/storage";
import { toast } from "@/hooks/use-toast";

const Gallery = () => {
  const [photos, setPhotos] = useState(getPhotos());

  const handleDelete = (photoId) => {
    deletePhoto(photoId);
    setPhotos(getPhotos());
    toast({
      title: "Photo Deleted",
      description: "The intruder photo has been removed.",
    });
  };

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

  if (photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Intruder Gallery</h1>
          <Card className="shadow-primary">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-6 rounded-full bg-secondary mb-4">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Captures Yet</h3>
              <p className="text-muted-foreground max-w-md">
                When an incorrect password is entered, photos will be captured and displayed here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Intruder Gallery</h1>
          <div className="text-sm text-muted-foreground">
            {photos.length} capture{photos.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden shadow-primary hover:shadow-alert transition-shadow">
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <img
                  src={photo.imageData}
                  alt={`Capture from ${formatDate(photo.timestamp)}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(photo.timestamp)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{photo.sentToEmail}</span>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this capture?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The intruder photo will be permanently removed from your device.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(photo.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
