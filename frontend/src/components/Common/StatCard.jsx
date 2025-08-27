import React from 'react';
import { Box, Text, Icon, Flex, useColorModeValue } from '@chakra-ui/react';

const StatCard = ({ label, value, icon: IconComponent, color = 'blue', ...rest }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      flex="1"
      minW={{ base: '100%', sm: '200px' }}
      {...rest}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={1}>
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </Box>
        <Flex
          align="center"
          justify="center"
          w={12}
          h={12}
          borderRadius="lg"
          bg={`${color}.100`}
          color={`${color}.600`}
        >
          <Icon as={IconComponent} boxSize={6} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default StatCard;
