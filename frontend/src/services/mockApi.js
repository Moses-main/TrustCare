// Mock API for development
const mockUsers = {
  'test@example.com': {
    id: '123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'patient',
    token: 'mock-jwt-token-123'
  }
};

export const mockAuthAPI = {
  login: async (credentials) => {
    console.log('Mock login with:', credentials);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const user = mockUsers[credentials.email];
    
    if (user && credentials.password === 'password123') {
      const { token, ...userData } = user;
      return {
        data: {
          token,
          user: userData
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  getMe: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      data: {
        id: '123',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'patient'
      }
    };
  }
};
