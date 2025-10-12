import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';

const ResendVerification = ({ email: initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      await authAPI.resendVerificationEmail(email);
      
      setIsSent(true);
      toast.success('Verification email sent successfully!');
      
      // Auto-close after 5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
      
    } catch (error) {
      console.error('Error resending verification email:', error);
      setError(error.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <Typography component="h1" variant="h5">
              Verification Email Sent
            </Typography>
          </Box>
          <Alert severity="success" sx={{ mb: 3 }}>
            We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the verification link to activate your account.
          </Alert>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Didn't receive the email? Check your spam folder or request a new verification email.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setEmail('');
              setIsSent(false);
            }}
            sx={{ mt: 2 }}
          >
            Resend Verification Email
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{ mt: 2, ml: 2 }}
          >
            Back to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Resend Verification Email
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
            Please enter your email address and we'll send you a new verification link.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Send Verification Email'
              )}
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResendVerification;
