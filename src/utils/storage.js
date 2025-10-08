// localStorage utility functions for security app

const STORAGE_KEYS = {
  EMAIL: 'securityApp_email',
  PHOTOS: 'securityApp_photos',
  THEME: 'securityApp_theme',
  PASSWORD: 'securityApp_password', // In production, never store passwords client-side!
};

// Email management
export const getEmail = () => {
  return localStorage.getItem(STORAGE_KEYS.EMAIL);
};

export const setEmail = (email) => {
  localStorage.setItem(STORAGE_KEYS.EMAIL, email);
};

export const clearEmail = () => {
  localStorage.removeItem(STORAGE_KEYS.EMAIL);
};

// Photos management
export const getPhotos = () => {
  const photos = localStorage.getItem(STORAGE_KEYS.PHOTOS);
  return photos ? JSON.parse(photos) : [];
};

export const addPhoto = (photoData) => {
  const photos = getPhotos();
  const newPhoto = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    imageData: photoData,
    sentToEmail: getEmail(),
  };
  photos.unshift(newPhoto); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  return newPhoto;
};

export const deletePhoto = (photoId) => {
  const photos = getPhotos();
  const filtered = photos.filter(photo => photo.id !== photoId);
  localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(filtered));
};

export const clearAllPhotos = () => {
  localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify([]));
};

// Theme management
export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

// Password management (demo only - never do this in production!)
export const getPassword = () => {
  return localStorage.getItem(STORAGE_KEYS.PASSWORD) || '1234';
};

export const setPassword = (password) => {
  localStorage.setItem(STORAGE_KEYS.PASSWORD, password);
};
