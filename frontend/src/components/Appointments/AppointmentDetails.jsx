import React, { useState, useMemo } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  Badge,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Select,
  useColorModeValue,
  IconButton,
  Tooltip,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
  Wrap,
  WrapItem,
  Spinner
} from '@chakra-ui/react';
import { 
  EditIcon, 
  CheckIcon, 
  CloseIcon, 
  CalendarIcon, 
  TimeIcon, 
  PhoneIcon, 
  EmailIcon,
  InfoIcon,
  ArrowBackIcon,
  ChatIcon,
  RepeatIcon,
  DownloadIcon,
  AtSignIcon
} from '@chakra-ui/icons';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { APPOINTMENT_STATUS, APPOINTMENT_STATUS_LABELS, APPOINTMENT_STATUS_COLORS, APPOINTMENT_STATUS_ICONS } from '../../constants/appointments';
import { appointmentsAPI } from '../../services/api';

const AppointmentDetails = ({ 
  appointment, 
  viewMode = 'provider',
  isOpen = false, 
  onClose,
  onStatusUpdate,
  onAppointmentUpdated
}) => {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    notes: '',
    status: '',
    serviceType: '',
    appointmentDate: '',
    duration: 30
  });
  const [activeTab, setActiveTab] = useState('details');
  
  // Set form data when appointment changes
  React.useEffect(() => {
    if (appointment) {
      setFormData({
        notes: appointment.notes || '',
        status: appointment.status,
        serviceType: appointment.serviceType || '',
        appointmentDate: appointment.appointmentDate || '',
        duration: appointment.duration || 30
      });
    }
  }, [appointment]);

  if (!appointment) return null;

  // Format date and time
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = parseISO(dateString);
    return {
      full: format(date, 'EEEE, MMMM d, yyyy'),
      time: format(date, 'h:mm a'),
      relative: formatDistanceToNow(date, { addSuffix: true })
    };
  };

  // Format duration in minutes to hours and minutes
  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hr`;
    return `${hours} hr ${mins} min`;
  };

  // Get status badge with icon
  const getStatusBadge = (status) => {
    const IconComponent = APPOINTMENT_STATUS_ICONS[status] || InfoIcon;
    const colorScheme = APPOINTMENT_STATUS_COLORS[status] || 'gray';
    const label = APPOINTMENT_STATUS_LABELS[status] || status;
    
    return (
      <Badge 
        colorScheme={colorScheme} 
        display="flex" 
        alignItems="center" 
        gap={1}
        px={2}
        py={1}
        borderRadius="md"
        textTransform="capitalize"
      >
        <Icon as={IconComponent} boxSize={3} />
        {label}
      </Badge>
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save appointment changes
  const handleSaveChanges = async () => {
    if (!appointment?._id) return;
    
    try {
      setIsSubmitting(true);
      const response = await appointmentsAPI.updateAppointment(
        appointment._id, 
        formData
      );
      
      toast({
        title: 'Appointment updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Notify parent component of the update
      if (onAppointmentUpdated) {
        onAppointmentUpdated(response.data);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update appointment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (newStatus) => {
    if (!appointment?._id) return;
    
    try {
      setIsSubmitting(true);
      if (onStatusUpdate) {
        await onStatusUpdate(appointment._id, newStatus);
      } else {
        await appointmentsAPI.updateAppointmentStatus(appointment._id, newStatus);
      }
      
      toast({
        title: 'Status updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Update local form data
      setFormData(prev => ({
        ...prev,
        status: newStatus
      }));
      
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update status',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get available status options based on current status
  const getAvailableStatusOptions = () => {
    if (viewMode === 'patient') {
      return [
        { value: APPOINTMENT_STATUS.CANCELLED, label: 'Cancel Appointment' }
      ];
    }
    
    // Provider view - show relevant status options
    switch (appointment.status) {
      case APPOINTMENT_STATUS.SCHEDULED:
        return [
          { value: APPOINTMENT_STATUS.CONFIRMED, label: 'Confirm' },
          { value: APPOINTMENT_STATUS.CANCELLED, label: 'Cancel' },
          { value: APPOINTMENT_STATUS.NO_SHOW, label: 'Mark as No Show' }
        ];
      case APPOINTMENT_STATUS.CONFIRMED:
        return [
          { value: APPOINTMENT_STATUS.IN_PROGRESS, label: 'Start Appointment' },
          { value: APPOINTMENT_STATUS.CANCELLED, label: 'Cancel' }
        ];
      case APPOINTMENT_STATUS.IN_PROGRESS:
        return [
          { value: APPOINTMENT_STATUS.COMPLETED, label: 'Complete Appointment' },
          { value: APPOINTMENT_STATUS.CANCELLED, label: 'Cancel' }
        ];
      default:
        return [];
    }
  };

  // Format service type for display
  const formatServiceType = (type) => {
    if (!type) return 'Not specified';
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get patient or provider info based on view mode
  const userInfo = viewMode === 'provider' ? appointment.patient : appointment.provider;
  const userRole = viewMode === 'provider' ? 'Patient' : 'Provider';
  
  // Format appointment date
  const appointmentDate = formatDate(appointment.appointmentDate);
  
  // Check if the current user can edit this appointment
  const canEdit = viewMode === 'provider' || 
                 (viewMode === 'patient' && 
                  [APPOINTMENT_STATUS.SCHEDULED, APPOINTMENT_STATUS.CONFIRMED].includes(appointment.status));
  
  // Status options for the status dropdown
  const statusOptions = getAvailableStatusOptions();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  // Render the appointment details view
  const renderDetailsView = () => (
    <VStack align="stretch" spacing={4}>
      {/* Header with status and actions */}
      <HStack justify="space-between" mb={4}>
        <HStack>
          <Text fontSize="xl" fontWeight="bold">
            {formatServiceType(appointment.serviceType)}
          </Text>
          {getStatusBadge(appointment.status)}
        </HStack>
        
        <HStack>
          {canEdit && (
            <Button
              leftIcon={<EditIcon />}
              onClick={toggleEdit}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
          )}
          
          {statusOptions.length > 0 && (
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />}
                colorScheme="blue"
                size="sm"
                isLoading={isSubmitting}
              >
                Actions
              </MenuButton>
              <MenuList>
                {statusOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    icon={<Icon as={APPOINTMENT_STATUS_ICONS[option.value] || InfoIcon} />}
                    onClick={() => handleStatusUpdate(option.value)}
                    color={APPOINTMENT_STATUS_COLORS[option.value] || 'inherit'}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
        </HStack>
      </HStack>
      
      {/* Tabs for different sections */}
      <Tabs variant="enclosed" isLazy>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Notes</Tab>
          {viewMode === 'provider' && <Tab>Medical History</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <VStack align="stretch" spacing={6}>
              {/* Appointment Info */}
              <Box>
                <Text fontSize="sm" color={mutedColor} mb={2}>
                  APPOINTMENT
                </Text>
                <VStack align="stretch" spacing={3}>
                  <HStack>
                    <Icon as={CalendarIcon} color={mutedColor} />
                    <Box>
                      <Text fontWeight="medium">{appointmentDate.full}</Text>
                      <Text fontSize="sm" color={mutedColor}>
                        {appointmentDate.time} • {appointmentDate.relative}
                      </Text>
                    </Box>
                  </HStack>
                  
                  <HStack>
                    <Icon as={TimeIcon} color={mutedColor} />
                    <Text>Duration: {formatDuration(appointment.duration)}</Text>
                  </HStack>
                  
                  {appointment.location && (
                    <HStack>
                      <Icon as={InfoIcon} color={mutedColor} />
                      <Text>Location: {appointment.location}</Text>
                    </HStack>
                  )}
                </VStack>
              </Box>
              
              <Divider />
              
              {/* Patient/Provider Info */}
              <Box>
                <Text fontSize="sm" color={mutedColor} mb={2}>
                  {userRole.toUpperCase()}
                </Text>
                <HStack spacing={4}>
                  <Avatar 
                    name={userInfo?.name} 
                    src={userInfo?.avatar} 
                    size="lg"
                  />
                  <Box>
                    <Text fontWeight="medium">{userInfo?.name || 'N/A'}</Text>
                    {userInfo?.specialty && (
                      <Text fontSize="sm" color={mutedColor}>
                        {userInfo.specialty}
                      </Text>
                    )}
                    
                    <HStack mt={2} spacing={4}>
                      {userInfo?.phone && (
                        <HStack spacing={1}>
                          <Icon as={PhoneIcon} boxSize={3} color={mutedColor} />
                          <Text fontSize="sm">{userInfo.phone}</Text>
                        </HStack>
                      )}
                      
                      {userInfo?.email && (
                        <HStack spacing={1}>
                          <Icon as={EmailIcon} boxSize={3} color={mutedColor} />
                          <Text fontSize="sm">{userInfo.email}</Text>
                        </HStack>
                      )}
                    </HStack>
                  </Box>
                </HStack>
              </Box>
              
              {appointment.reason && (
                <>
                  <Divider />
                  <Box>
                    <Text fontSize="sm" color={mutedColor} mb={2}>
                      REASON FOR VISIT
                    </Text>
                    <Text>{appointment.reason}</Text>
                  </Box>
                </>
              )}
            </VStack>
          </TabPanel>
          
          <TabPanel px={0}>
            {isEditing ? (
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel>Notes</FormLabel>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add notes about this appointment..."
                    rows={6}
                  />
                </FormControl>
                <HStack justify="flex-end" spacing={3}>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    colorScheme="blue" 
                    onClick={handleSaveChanges}
                    isLoading={isSubmitting}
                    loadingText="Saving..."
                  >
                    Save Changes
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Box>
                {appointment.notes ? (
                  <Text whiteSpace="pre-line">{appointment.notes}</Text>
                ) : (
                  <VStack py={8} color={mutedColor} spacing={2}>
                    <Icon as={ChatIcon} boxSize={8} />
                    <Text>No notes have been added yet.</Text>
                    {canEdit && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        leftIcon={<EditIcon />}
                        onClick={toggleEdit}
                        mt={2}
                      >
                        Add Notes
                      </Button>
                    )}
                  </VStack>
                )}
              </Box>
            )}
          </TabPanel>
          
          {viewMode === 'provider' && (
            <TabPanel px={0}>
              <Text color={mutedColor} fontStyle="italic">
                Patient medical history will be displayed here.
              </Text>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </VStack>
  );

  // Render the edit form
  const renderEditForm = () => (
    <VStack align="stretch" spacing={6}>
      <FormControl>
        <FormLabel>Service Type</FormLabel>
        <Select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          placeholder="Select service type"
        >
          {APPOINTMENT_TYPES.map((type) => (
            <option key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
              {type}
            </option>
          ))}
        </Select>
      </FormControl>
      
      <FormControl>
        <FormLabel>Date & Time</FormLabel>
        <Input
          type="datetime-local"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleInputChange}
        />
      </FormControl>
      
      <FormControl>
        <FormLabel>Duration (minutes)</FormLabel>
        <Input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          min={15}
          step={15}
        />
      </FormControl>
      
      <HStack justify="flex-end" spacing={3} mt={6}>
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(false)}
          isDisabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          colorScheme="blue" 
          onClick={handleSaveChanges}
          isLoading={isSubmitting}
          loadingText="Saving..."
        >
          Save Changes
        </Button>
      </HStack>
    </VStack>
  );

  // Main component render
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={isMobile ? 'full' : '2xl'}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={4} align="center">
            {isMobile && (
              <IconButton
                icon={<ArrowBackIcon />}
                variant="ghost"
                onClick={onClose}
                aria-label="Close"
              />
            )}
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {isEditing ? 'Edit Appointment' : 'Appointment Details'}
              </Text>
              {!isEditing && appointmentDate && (
                <Text fontSize="sm" color={mutedColor}>
                  {appointmentDate.full} • {appointmentDate.time}
                </Text>
              )}
            </Box>
          </HStack>
        </ModalHeader>
        {!isMobile && <ModalCloseButton />}
        
        <ModalBody pb={6}>
          {isEditing ? renderEditForm() : renderDetailsView()}
        </ModalBody>
        
        {!isMobile && (
          <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
            <HStack spacing={3}>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {isEditing ? (
                <Button 
                  colorScheme="blue" 
                  onClick={handleSaveChanges}
                  isLoading={isSubmitting}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
              ) : canEdit ? (
                <Button 
                  leftIcon={<EditIcon />} 
                  onClick={toggleEdit}
                >
                  Edit Appointment
                </Button>
              ) : null}
            </HStack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );

  const handleCancelAppointment = async () => {
    try {
      await axios.put(`/api/appointments/${appointment._id}/status`, { 
        status: 'cancelled' 
      });
      
      toast({
        title: 'Appointment cancelled',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      if (onAppointmentUpdated) {
        onAppointmentUpdated();
      }
      
      if (onClose) {
        onClose();
      }
      
      // Refresh the parent component
      if (window.location) window.location.reload();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel appointment. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {formatServiceType(appointment.serviceType)}
        </Text>
        <Text color="gray.500">
          {formatDate(appointment.appointmentDate)}
        </Text>
        <Box mt={2}>
          {getStatusBadge(appointment.status)}
        </Box>
      </Box>

      <Divider />

      <Box>
        <Text fontWeight="bold" mb={2}>Appointment Details</Text>
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <Text color="gray.600">Appointment ID:</Text>
            <Text fontWeight="medium">{appointment.appointmentId}</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text color="gray.600">Date & Time:</Text>
            <Text>{formatDate(appointment.appointmentDate)}</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text color="gray.600">Service Type:</Text>
            <Text>{formatServiceType(appointment.serviceType)}</Text>
          </HStack>
          
          {appointment.notes && (
            <Box pt={2}>
              <Text color="gray.600" mb={1}>Notes:</Text>
              <Box p={3} bg="gray.50" borderRadius="md">
                <Text>{appointment.notes}</Text>
              </Box>
            </Box>
          )}
        </VStack>
      </Box>

      <Divider />

      <Box>
        <Text fontWeight="bold" mb={2}>
          {userType === 'patient' ? 'Provider Information' : 'Patient Information'}
        </Text>
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <Text color="gray.600">Name:</Text>
            <Text>
              {userType === 'patient' 
                ? appointment.providerId?.name || 'N/A'
                : appointment.patientId?.name || 'N/A'}
            </Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text color="gray.600">Email:</Text>
            <Text>
              {userType === 'patient'
                ? appointment.providerId?.email || 'N/A'
                : appointment.patientId?.email || 'N/A'}
            </Text>
          </HStack>
          
          {userType === 'provider' && appointment.patientId?.phone && (
            <HStack justify="space-between">
              <Text color="gray.600">Phone:</Text>
              <Text>{appointment.patientId.phone}</Text>
            </HStack>
          )}
        </VStack>
      </Box>

      {userType === 'patient' && appointment.status === 'scheduled' && (
        <Box pt={4}>
          <Button 
            colorScheme="red" 
            variant="outline" 
            width="full"
            onClick={handleCancelAppointment}
          >
            Cancel Appointment
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default AppointmentDetails;
