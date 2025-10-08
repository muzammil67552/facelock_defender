// Email helper - attempts to POST to a configured webhook with image data.
// In-browser direct email sending isn't possible without a backend or external service.
// This helper will POST to the webhook if provided, otherwise it will simulate and return success.

import { getEmailWebhook, getEmail, addLog, updatePhoto } from "./storage";

export const sendImageToEmail = async (photo) => {
  const webhook = getEmailWebhook();
  const ownerEmail = getEmail();

  // Prepare minimal payload
  const payload = {
    to: ownerEmail,
    timestamp: photo.timestamp,
    photoId: photo.id,
    imageData: photo.imageData,
  };

  if (!ownerEmail) {
    const entry = addLog({ type: 'email_failed', message: 'No owner email configured', photoId: photo.id });
    await updatePhoto(photo.id, { emailed: false, emailError: 'no_email_configured' });
    return { success: false, error: 'no_email_configured', log: entry };
  }

  if (!webhook) {
    // Simulate email: just log the action locally
    const entry = addLog({ type: 'email_simulated', message: `Simulated sending to ${ownerEmail}`, photoId: photo.id });
    await updatePhoto(photo.id, { emailed: true });
    return { success: true, simulated: true, log: entry };
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      const entry = addLog({ type: 'email_error', message: `Webhook responded ${res.status}: ${text}`, photoId: photo.id });
      await updatePhoto(photo.id, { emailed: false, emailError: `webhook_${res.status}` });
      return { success: false, error: `webhook_${res.status}`, log: entry };
    }

    const entry = addLog({ type: 'email_sent', message: `Photo sent to webhook for ${ownerEmail}`, photoId: photo.id });
    await updatePhoto(photo.id, { emailed: true });
    return { success: true, log: entry };
  } catch (error) {
    const entry = addLog({ type: 'email_error', message: error.message, photoId: photo.id });
    await updatePhoto(photo.id, { emailed: false, emailError: error.message });
    return { success: false, error: error.message, log: entry };
  }
};
