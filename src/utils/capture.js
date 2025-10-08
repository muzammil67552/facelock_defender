// Webcam capture utilities

export const capturePhoto = async () => {
  try {
    // Request user media with front camera preference
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    // Create video element to capture frame
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    // Wait for video to load
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve();
      };
    });

    // Create canvas and capture frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Stop all tracks
    stream.getTracks().forEach(track => track.stop());

    // Convert to data URL
    const dataURL = canvas.toDataURL('image/jpeg', 0.8);
    return dataURL;
  } catch (error) {
    console.error('Error capturing photo:', error);
    throw new Error('Failed to capture photo. Please ensure camera permissions are granted.');
  }
};

export const checkCameraPermission = async () => {
  try {
    const result = await navigator.permissions.query({ name: 'camera' });
    return result.state === 'granted';
  } catch (error) {
    // Fallback: try to access camera directly
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      return false;
    }
  }
};
