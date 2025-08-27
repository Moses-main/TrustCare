import React, { Component } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box p={5}>
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg" color="red.500">
              Something went wrong
            </Heading>
            <Text fontSize="md">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button 
              colorScheme="blue" 
              onClick={this.handleReset}
              mt={4}
            >
              Try again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
