import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f0ff',
      100: '#cce0ff',
      200: '#99c2ff',
      300: '#66a3ff',
      400: '#3385ff',
      500: '#0066cc', // Primary brand color (Johns Hopkins blue)
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    },
    accent: {
      50: '#fff5e6',
      100: '#ffebcc',
      200: '#ffd699',
      300: '#ffc266',
      400: '#ffad33',
      500: '#ff9900', // Accent color
      600: '#cc7a00',
      700: '#995c00',
      800: '#663d00',
      900: '#331f00',
    },
  },
  fonts: {
    heading: '"Source Sans Pro", sans-serif',
    body: '"Source Sans Pro", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: (props) => ({
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            _disabled: {
              bg: 'brand.500',
            },
          },
        }),
        outline: (props) => ({
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        }),
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        color: 'gray.800',
        lineHeight: 'tall',
      },
      a: {
        color: 'brand.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export default theme;
