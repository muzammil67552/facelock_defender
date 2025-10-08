// localStorage utility functions for security app

const STORAGE_KEYS = {
  EMAIL: 'securityApp_email',
  PHOTOS: 'securityApp_photos',
  THEME: 'securityApp_theme',
  PASSWORD: 'securityApp_password', // In production, never store passwords client-side!
  WEBHOOK: 'securityApp_email_webhook',
  TRIGGER_THRESHOLD: 'securityApp_trigger_threshold',
  LOGS: 'securityApp_logs',
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
    emailed: false,
    emailError: null,
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

export const updatePhoto = (photoId, updates) => {
  const photos = getPhotos();
  const idx = photos.findIndex(p => p.id === photoId);
  if (idx === -1) return null;
  photos[idx] = { ...photos[idx], ...updates };
  localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  return photos[idx];
};

// Trigger threshold (number of consecutive wrong attempts to capture)
export const getTriggerThreshold = () => {
  const v = localStorage.getItem(STORAGE_KEYS.TRIGGER_THRESHOLD);
  return v ? parseInt(v, 10) : 2; // default 2
};

export const setTriggerThreshold = (n) => {
  localStorage.setItem(STORAGE_KEYS.TRIGGER_THRESHOLD, String(n));
};

// Webhook / external email endpoint (optional)
export const getEmailWebhook = () => {
  return localStorage.getItem(STORAGE_KEYS.WEBHOOK) || '';
};

export const setEmailWebhook = (url) => {
  localStorage.setItem(STORAGE_KEYS.WEBHOOK, url);
};

// Simple local logging
export const getLogs = () => {
  const logs = localStorage.getItem(STORAGE_KEYS.LOGS);
  return logs ? JSON.parse(logs) : [];
};

export const addLog = (entry) => {
  const logs = getLogs();
  const newEntry = { id: Date.now().toString(), timestamp: new Date().toISOString(), ...entry };
  logs.unshift(newEntry);
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  return newEntry;
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
