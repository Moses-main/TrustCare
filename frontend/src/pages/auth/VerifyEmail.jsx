import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsVerifying(true);
        await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        
        // Update auth state if user is logged in
        setAuthState(prev => ({
          ...prev,
          user: {
            ...prev.user,
            isEmailVerified: true
          }
        }));
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(
          error.response?.data?.message || 
          'The verification link is invalid or has expired. Please request a new one.'
        );
      } finally {
        setIsVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setMessage('No verification token provided.');
    }
  }, [token, navigate, setAuthState]);

  const handleResendEmail = async () => {
    try {
      // We'll implement this in the next step
      // await resendVerificationEmail();
      toast.success('Verification email resent successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend verification email');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        {status === 'verifying' && (
          <>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography component="h1" variant="h5">
              Verifying your email...
            </Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography component="h1" variant="h5" gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {message}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Redirecting to dashboard...
            </Typography>
          </>
        )}

        {status === 'error' && (
          <>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography component="h1" variant="h5" gutterBottom>
              Verification Failed
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {message}
            </Typography>
            <Button
              variant="contained"
              onClick={handleResendEmail}
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
          </>
        )}
      </Box>
    </Container>
  );
};

export default VerifyEmail;
