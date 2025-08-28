// Mock API for development
const mockUsers = [
  {
    id: 'patient-123',
    email: 'patient@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'patient',
    password: 'password123',
    token: 'mock-patient-token-123',
    createdAt: new Date().toISOString()
  },
  {
    id: 'doctor-456',
    email: 'doctor@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'provider',
    password: 'password123',
    token: 'mock-doctor-token-456',
    createdAt: new Date().toISOString()
  }
];

// Create a map for quick lookup
const userMap = mockUsers.reduce((acc, user) => {
  acc[user.email] = user;
  return acc;
}, {});

export const mockAuthAPI = {
  login: async (credentials) => {
    console.log('Mock login with:', credentials.email);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    const user = userMap[credentials.email];
    
    if (user && credentials.password === user.password) {
      // Clone user object and remove sensitive data
      const { password, token, ...userData } = JSON.parse(JSON.stringify(user));
      
      // Store token in localStorage to simulate real auth
      localStorage.setItem('token', token);
      
      return {
        data: {
          token,
          user: userData
        }
      };
    }
    
    throw new Error('Invalid email or password');
  },
  
  getMe: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Find user by token
    const user = mockUsers.find(u => u.token === token);
    
    if (!user) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please log in again');
    }
    
    // Clone user object and remove sensitive data
    const { password, token: userToken, ...userData } = JSON.parse(JSON.stringify(user));
    
    // Return user data without the token
    return { data: userData };
  }
};
