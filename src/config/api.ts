// Configuration for Flask backend API
// Update this URL to point to your deployed Flask backend
export const API_BASE_URL = "http://127.0.0.1:5000";

export const ENDPOINTS = {
  predict: `${API_BASE_URL}/predict`,
  chat: `${API_BASE_URL}/chat`,
};
