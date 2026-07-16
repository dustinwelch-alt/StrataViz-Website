import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const getDownloads = async () => {
  const { data } = await axios.get(`${API}/downloads`);
  return data;
};

export const trackDownload = async (platform) => {
  const { data } = await axios.post(`${API}/downloads/${platform}/track`);
  return data;
};

export const subscribe = async (email, role) => {
  const { data } = await axios.post(`${API}/subscribe`, { email, role });
  return data;
};
