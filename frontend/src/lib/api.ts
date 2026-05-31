import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const loginUser = async (credentials: Record<string, unknown>) => {
  const { data } = await api.post('/auth/login', credentials);
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

export const registerUser = async (userData: Record<string, unknown>) => {
  const { data } = await api.post('/auth/register', userData);
  if (data.token) localStorage.setItem('token', data.token);
  return data;
};

// --- Clients ---
export const fetchClients = async () => {
  const { data } = await api.get('/clients');
  return data;
};
export const createClient = async (clientData: Record<string, unknown>) => {
  const { data } = await api.post('/clients', clientData);
  return data;
};
export const updateClient = async (id: string, clientData: Record<string, unknown>) => {
  const { data } = await api.put(`/clients/${id}`, clientData);
  return data;
};
export const deleteClient = async (id: string) => {
  const { data } = await api.delete(`/clients/${id}`);
  return data;
};

// --- Projects ---
export const fetchProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};
export const createProject = async (projectData: Record<string, unknown>) => {
  const { data } = await api.post('/projects', projectData);
  return data;
};
export const updateProject = async (id: string, projectData: Record<string, unknown>) => {
  const { data } = await api.put(`/projects/${id}`, projectData);
  return data;
};
export const deleteProject = async (id: string) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

// --- Messages ---
export const fetchMessages = async (projectId: string) => {
  const { data } = await api.get(`/messages/${projectId}`);
  return data;
};
export const createMessage = async (projectId: string, content: string) => {
  const { data } = await api.post('/messages', { projectId, content });
  return data;
};

// --- Invoices ---
export const fetchInvoices = async () => {
  const { data } = await api.get('/invoices');
  return data;
};
export const createInvoice = async (invoiceData: Record<string, unknown>) => {
  const { data } = await api.post('/invoices', invoiceData);
  return data;
};
export const updateInvoice = async (id: string, invoiceData: Record<string, unknown>) => {
  const { data } = await api.put(`/invoices/${id}`, invoiceData);
  return data;
};
export const deleteInvoice = async (id: string) => {
  const { data } = await api.delete(`/invoices/${id}`);
  return data;
};

// --- Files ---
export const fetchFiles = async () => {
  const { data } = await api.get('/files');
  return data;
};
export const uploadFileAPI = async (formData: FormData) => {
  const { data } = await api.post('/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};
export const deleteFile = async (id: string) => {
  const { data } = await api.delete(`/files/${id}`);
  return data;
};

// --- AI Assistant ---
export const fetchAiHistory = async () => {
  const { data } = await api.get('/ai/history');
  return data;
};
export const sendAiMessage = async (prompt: string) => {
  const { data } = await api.post('/ai/chat', { prompt });
  return data;
};

export default api;
