// API Configuration
export const API_CONFIG = {
  // Replace with your actual backend URL
  BASE_URL: 'https://clinic-backend-s2lx.onrender.com/api',
  
  // For production, use your deployed backend URL
  // BASE_URL: 'https://your-backend-domain.com/api',
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
    },
    USER: {
      PROFILE: '/profile',
      UPDATE_PROFILE: '/profile',
    },
    APPOINTMENTS: {
      LIST: '/appointments',
      CREATE: '/appointments',
      UPDATE: '/appointments',
      DELETE: '/appointments',
    },
    PRESCRIPTIONS: {
      LIST: '/prescriptions',
      LATEST: '/prescriptions/latest',
      CREATE: '/prescriptions',
    },
    CHAT: {
      MESSAGES: '/chat/messages',
      SEND: '/chat/send',
    },
  },
  
  TIMEOUT: 10000, // 10 seconds
};