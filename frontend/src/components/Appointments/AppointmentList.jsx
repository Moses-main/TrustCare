import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { 
  ViewIcon, 
  TimeIcon, 
  CheckIcon, 
  CloseIcon, 
  ChevronDownIcon,
  CalendarIcon
} from '@chakra-ui/icons';
import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { APPOINTMENT_STATUS_COLORS } from '../../constants/appointments';
import AppointmentDetails from './AppointmentDetails';

const AppointmentList = ({ 
  appointments = [], 
  onAppointmentClick,
  onStatusUpdate,
  viewMode = 'provider',
  loading = false,
  userType = 'provider'
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
    if (onAppointmentClick) {
      onAppointmentClick(appointment);
    }
  };

  // Format date for display
  const formatAppointmentDate = (dateString) => {
    const date = parseISO(dateString);
    let formattedDate = format(date, 'MMM d, yyyy');
    
    if (isToday(date)) {
      formattedDate = 'Today';
    } else if (isTomorrow(date)) {
      formattedDate = 'Tomorrow';
    } else if (isThisWeek(date)) {
      formattedDate = format(date, 'EEEE');
    }
    
    return {
      date: formattedDate,
      time: format(date, 'h:mm a'),
      fullDate: format(date, 'EEEE, MMMM d, yyyy')
    };
  };

  // Loading skeleton
  if (loading) {
    return (
      <Box p={4}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height="80px" mb={4} borderRadius="md" />
        ))}
      </Box>
    );
  }

  // Empty state
  if (!appointments.length) {
    return (
      <VStack py={10} spacing={4} color="gray.500">
        <Icon as={CalendarIcon} boxSize={10} />
        <Text>No appointments found</Text>
      </VStack>
    );
  }
  const handleViewDetails = (appointment) => {
    handleAppointmentClick(appointment);
  };

  const handleStatusUpdate = (appointmentId, status) => {
    if (onStatusUpdate) {
      onStatusUpdate(appointmentId, status);
    }
  };

  // Get status display
  const getStatusBadge = (status) => {
    const colorScheme = APPOINTMENT_STATUS_COLORS[status] || 'gray';
    return (
      <Badge colorScheme={colorScheme}>
        {status}
      </Badge>
    );
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date & Time</Th>
            <Th>{viewMode === 'patient' ? 'Provider' : 'Patient'}</Th>
            <Th>Service</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map((appointment) => {
            const formattedDate = formatAppointmentDate(appointment.appointmentDate);
            const userName = viewMode === 'patient' 
              ? appointment.provider?.name || 'N/A'
              : appointment.patient?.name || 'N/A';
              
            return (
              <Tr 
                key={appointment._id} 
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                cursor="pointer"
                onClick={() => handleViewDetails(appointment)}
              >
                <Td>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">{formattedDate.date}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {formattedDate.time}
                    </Text>
                  </VStack>
                </Td>
                <Td>{userName}</Td>
                <Td>
                  <Text textTransform="capitalize">
                    {appointment.serviceType?.replace(/-/g, ' ')}
                  </Text>
                </Td>
                <Td>
                  {getStatusBadge(appointment.status)}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<ViewIcon />}
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(appointment);
                      }}
                      aria-label="View details"
                    />
                    
                    {viewMode === 'provider' && appointment.status === 'scheduled' && (
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          size="sm"
                          icon={<ChevronDownIcon />}
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <MenuList onClick={(e) => e.stopPropagation()}>
                          <MenuItem 
                            icon={<CheckIcon />}
                            onClick={() => handleStatusUpdate(appointment._id, 'confirmed')}
                          >
                            Confirm
                          </MenuItem>
                          <MenuItem 
                            icon={<TimeIcon />}
                            onClick={() => handleStatusUpdate(appointment._id, 'in-progress')}
                          >
                            Start Session
                          </MenuItem>
                          <MenuItem 
                            icon={<CloseIcon />}
                            color="red.500"
                            onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                          >
                            Cancel
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    )}
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Appointment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAppointment && (
              <AppointmentDetails 
                appointment={selectedAppointment} 
                userType={userType} 
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AppointmentList;
