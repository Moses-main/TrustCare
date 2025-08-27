import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from '../App';
import DoctorsLogin from '../components/doctors/DoctorsLogin';
import PatientLogin from '../components/patients/PatientsLogin';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('Authentication Flow', () => {
  // Test Doctor Login
  test('should allow doctor to log in and access protected routes', async () => {
    // Mock successful login
    localStorage.setItem('user', JSON.stringify({
      token: 'test-token',
      role: 'doctor',
      email: 'doctor@example.com'
    }));

    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/doctors/dashboard']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Verify dashboard is accessible
    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
  });

  // Test Unauthorized Access
  test('should redirect to login when accessing protected route without authentication', () => {
    localStorage.removeItem('user');
    
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={['/doctors/dashboard']}>
          <App />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Should redirect to login
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // Test Doctor Login Component
  test('should handle doctor login form submission', async () => {
    const mockLogin = jest.fn();
    
    render(
      <ChakraProvider>
        <MemoryRouter>
          <DoctorsLogin onLogin={mockLogin} />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Fill out and submit the form
    fireEvent.change(screen.getByPlaceholderText(/Your Email address/i), {
      target: { value: 'doctor@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Add assertions based on your login logic
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  // Test Patient Login Component
  test('should handle patient login form submission', async () => {
    const mockLogin = jest.fn();
    
    render(
      <ChakraProvider>
        <MemoryRouter>
          <PatientLogin onLogin={mockLogin} />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Fill out and submit the form
    fireEvent.change(screen.getByPlaceholderText(/Your Email address/i), {
      target: { value: 'patient@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Your Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    // Add assertions based on your login logic
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
