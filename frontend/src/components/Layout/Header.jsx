import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
  useDisclosure,
  Link as ChakraLink,
  Container,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const NavItem = ({ children, to = '/', ...rest }) => (
  <ChakraLink
    as={RouterLink}
    to={to}
    px={4}
    py={2}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.100', 'gray.700'),
    }}
    {...rest}
  >
    {children}
  </ChakraLink>
);

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box bg={'white'} boxShadow={'sm'} position="sticky" top={0} zIndex={10}>
      <Container maxW={'7xl'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Flex align="center">
                <Image
                  src="/logo.png"
                  alt="DHRS Logo"
                  h={10}
                  mr={2}
                  display={{ base: 'none', md: 'block' }}
                />
                <Text fontSize="xl" fontWeight="bold" color="brand.500">
                  DHRS
                </Text>
              </Flex>
            </ChakraLink>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <Stack direction={'row'} spacing={4} align="center">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/doctors">Find a Doctor</NavItem>
                <NavItem to="/services">Services</NavItem>
                <NavItem to="/appointments">Appointments</NavItem>
                <NavItem to="/records">My Health Records</NavItem>
              </Stack>
            </Flex>
          </Flex>

          <Flex alignItems={'center'}>
            {isAuthenticated ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    name={JSON.parse(localStorage.getItem('user'))?.name || 'User'}
                    bg="brand.500"
                    color="white"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">My Profile</MenuItem>
                  <MenuItem as={RouterLink} to="/appointments">My Appointments</MenuItem>
                  <MenuItem as={RouterLink} to="/records">My Records</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Stack direction={'row'} spacing={4}>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant={'outline'}
                  colorScheme="brand"
                >
                  Sign In
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="brand"
                  bg={'brand.500'}
                  _hover={{
                    bg: 'brand.600',
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            )}

            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={onToggle}
              ml={2}
            />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavItem to="/">Home</NavItem>
              <NavItem to="/doctors">Find a Doctor</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/appointments">Appointments</NavItem>
              <NavItem to="/records">My Health Records</NavItem>
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Header;
