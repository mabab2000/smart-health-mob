import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'video' | 'voice' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Prescription {
  id: string;
  date: string;
  summary: string;
  assessment: string;
  recommendations: string[];
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth APIs
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Appointments APIs
  async getAppointments(): Promise<Appointment[]> {
    return this.request<Appointment[]>('/appointments');
  }

  async createAppointment(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointment),
    });
  }

  // Prescriptions APIs
  async getPrescriptions(): Promise<Prescription[]> {
    return this.request<Prescription[]>('/prescriptions');
  }

  async getLatestPrescription(): Promise<Prescription> {
    return this.request<Prescription>('/prescriptions/latest');
  }

  // Profile APIs
  async getProfile(): Promise<LoginResponse['user']> {
    return this.request<LoginResponse['user']>('/profile');
  }

  async updateProfile(data: Partial<LoginResponse['user']>): Promise<LoginResponse['user']> {
    return this.request<LoginResponse['user']>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();