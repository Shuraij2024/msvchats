import axios from "axios";

// Replace with your machine’s IP
// const API_URL = "http://192.168.1.64:3000/messages";

const API_URL = "http://localhost:3000/messages";

export interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const sendMessage = async (message: {
  text: string;
  sender: string;
}): Promise<Message> => {
  const response = await axios.post(API_URL, {
    ...message,
    timestamp: new Date().toISOString(),
  });
  return response.data;
};

export const updateMessage = async (
  id: number,
  message: { text: string; sender: string }
): Promise<Message> => {
  const response = await axios.put(`${API_URL}/${id}`, message);
  return response.data;
};

export const deleteMessage = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};