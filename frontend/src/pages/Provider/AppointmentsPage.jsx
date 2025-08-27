import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useToast,
  VStack,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  Badge,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Skeleton
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  CalendarIcon, 
  TimeIcon, 
  CheckIcon, 
  CloseIcon,
  RepeatIcon,
  AddIcon,
  DownloadIcon
} from '@chakra-ui/icons';
import { format, parseISO, isToday, isThisWeek, isAfter, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentsAPI } from '../../services/api';
import AppointmentList from '../../components/Appointments/AppointmentList';
import AppointmentDetails from '../../components/Appointments/AppointmentDetails';
import { APPOINTMENT_STATUS } from '../../constants/appointments';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'today',
    searchQuery: ''
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Fetch appointments from the API
  const fetchAppointments = useCallback(async () => {
    if (!user?.userId) return;
    
    try {
      setLoading(true);
      const response = await appointmentsAPI.getProviderAppointments(user.userId);
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load appointments. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [user?.userId, toast]);

  // Initial data fetch
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Apply filters to appointments
  useEffect(() => {
    if (!appointments.length) {
      setFilteredAppointments([]);
      return;
    }

    let result = [...appointments];
    const now = new Date();

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(apt => apt.status === filters.status);
    }

    // Filter by date range
    switch (filters.dateRange) {
      case 'today':
        result = result.filter(apt => isToday(parseISO(apt.appointmentDate)));
        break;
      case 'tomorrow':
        const tomorrow = addDays(now, 1);
        result = result.filter(apt => {
          const aptDate = parseISO(apt.appointmentDate);
          return aptDate.getDate() === tomorrow.getDate() && 
                 aptDate.getMonth() === tomorrow.getMonth() &&
                 aptDate.getFullYear() === tomorrow.getFullYear();
        });
        break;
      case 'this_week':
        const startOfThisWeek = startOfWeek(now);
        const endOfThisWeek = endOfWeek(now);
        result = result.filter(apt => {
          const aptDate = parseISO(apt.appointmentDate);
          return isAfter(aptDate, startOfThisWeek) && 
                 aptDate <= endOfThisWeek;
        });
        break;
      case 'next_week':
        const nextWeekStart = addDays(startOfWeek(now), 7);
        const nextWeekEnd = endOfWeek(nextWeekStart);
        result = result.filter(apt => {
          const aptDate = parseISO(apt.appointmentDate);
          return isAfter(aptDate, nextWeekStart) && 
                 aptDate <= nextWeekEnd;
        });
        break;
      default:
        break;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(apt => 
        apt.patient?.name?.toLowerCase().includes(query) ||
        apt.patient?.email?.toLowerCase().includes(query) ||
        apt.serviceType?.toLowerCase().includes(query) ||
        apt.notes?.toLowerCase().includes(query)
      );
    }

    // Sort by date (ascending)
    result.sort((a, b) => 
      new Date(a.appointmentDate) - new Date(b.appointmentDate)
    );

    setFilteredAppointments(result);
  }, [appointments, filters]);

  // Handle status update
  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await appointmentsAPI.updateAppointmentStatus(appointmentId, newStatus);
      
      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt._id === appointmentId 
            ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() } 
            : apt
        )
      );
      
      toast({
        title: 'Appointment updated',
        description: `Appointment has been marked as ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update appointment status',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle appointment selection
  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get appointment statistics
  const getAppointmentStats = () => {
    const stats = {
      total: appointments.length,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0,
      upcoming: 0
    };

    const now = new Date();

    appointments.forEach(apt => {
      const aptDate = parseISO(apt.appointmentDate);
      
      if (apt.status === APPOINTMENT_STATUS.SCHEDULED) {
        stats.scheduled++;
        if (isAfter(aptDate, now)) {
          stats.upcoming++;
        }
      } else if (apt.status === APPOINTMENT_STATUS.COMPLETED) {
        stats.completed++;
      } else if (apt.status === APPOINTMENT_STATUS.CANCELLED) {
        stats.cancelled++;
      } else if (apt.status === APPOINTMENT_STATUS.NO_SHOW) {
        stats.noShow++;
      }
    });

    return stats;
  };

  const stats = getAppointmentStats();

  return (
    <Box p={{ base: 4, md: 6 }}>
      {/* Header */}
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        align={{ base: 'stretch', md: 'center' }}
        mb={6}
      >
        <Box mb={{ base: 4, md: 0 }}>
          <Heading size="lg" mb={1}>Appointments</Heading>
          <Text color="gray.500">
            Manage your appointments and patient consultations
          </Text>
        </Box>
        
        <HStack spacing={3}>
          <Button 
            leftIcon={<DownloadIcon />} 
            variant="outline"
            size={{ base: 'sm', md: 'md' }}
          >
            Export
          </Button>
          <Button 
            colorScheme="blue" 
            leftIcon={<AddIcon />}
            size={{ base: 'sm', md: 'md' }}
            onClick={() => {
              // TODO: Implement new appointment creation
              toast({
                title: 'New Appointment',
                description: 'Appointment creation will be implemented soon',
                status: 'info',
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            New Appointment
          </Button>
        </HStack>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 4 }} 
        spacing={4} 
        mb={6}
      >
        <StatCard 
          label="Total Appointments" 
          value={stats.total} 
          icon={CalendarIcon} 
          color="blue"
          loading={loading}
        />
        <StatCard 
          label="Upcoming" 
          value={stats.upcoming} 
          icon={TimeIcon} 
          color="green"
          loading={loading}
        />
        <StatCard 
          label="Completed" 
          value={stats.completed} 
          icon={CheckIcon} 
          color="purple"
          loading={loading}
        />
        <StatCard 
          label="Cancelled" 
          value={stats.cancelled + stats.noShow} 
          icon={CloseIcon} 
          color="red"
          loading={loading}
        />
      </SimpleGrid>

      {/* Filters */}
      <Box 
        bg={cardBg} 
        p={4} 
        borderRadius="lg" 
        border="1px" 
        borderColor={borderColor}
        mb={6}
      >
        <VStack spacing={4} align="stretch">
          <InputGroup maxW={{ base: '100%', md: '400px' }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input 
              placeholder="Search by patient name, email, or notes..." 
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
            />
          </InputGroup>
          
          <HStack flexWrap="wrap" spacing={4}>
            <Select 
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              maxW="200px"
              size="sm"
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this_week">This Week</option>
              <option value="next_week">Next Week</option>
              <option value="all">All Dates</option>
            </Select>
            
            <Select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              maxW="200px"
              size="sm"
            >
              <option value="all">All Statuses</option>
              <option value={APPOINTMENT_STATUS.SCHEDULED}>Scheduled</option>
              <option value={APPOINTMENT_STATUS.CONFIRMED}>Confirmed</option>
              <option value={APPOINTMENT_STATUS.IN_PROGRESS}>In Progress</option>
              <option value={APPOINTMENT_STATUS.COMPLETED}>Completed</option>
              <option value={APPOINTMENT_STATUS.CANCELLED}>Cancelled</option>
              <option value={APPOINTMENT_STATUS.NO_SHOW}>No Show</option>
            </Select>
            
            <Button 
              leftIcon={<RepeatIcon />} 
              variant="outline" 
              size="sm"
              onClick={fetchAppointments}
              isLoading={loading}
            >
              Refresh
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Appointments List */}
      <Box 
        bg={cardBg} 
        borderRadius="lg" 
        border="1px" 
        borderColor={borderColor}
        overflow="hidden"
      >
        <AppointmentList 
          appointments={filteredAppointments}
          loading={loading}
          onAppointmentClick={handleAppointmentSelect}
          onStatusUpdate={handleStatusUpdate}
          viewMode="provider"
        />
      </Box>

      {/* Appointment Details Modal */}
      <AppointmentDetails 
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onStatusUpdate={handleStatusUpdate}
        onAppointmentUpdated={(updatedAppointment) => {
          // Update the appointments list with the updated appointment
          setAppointments(prev => 
            prev.map(apt => 
              apt._id === updatedAppointment._id ? updatedAppointment : apt
            )
          );
        }}
        viewMode="provider"
      />
    </Box>
  );
};

// StatCard component to display appointment statistics
const StatCard = ({ label, value, icon: Icon, color, loading = false }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      bg={cardBg} 
      p={4} 
      borderRadius="lg" 
      border="1px" 
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
    >
      <Skeleton isLoaded={!loading}>
        <HStack justify="space-between" align="flex-start">
          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>
              {label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {value}
            </Text>
          </Box>
          <Box
            p={2}
            bg={`${color}.100`}
            color={`${color}.600`}
            borderRadius="md"
          >
            <Icon boxSize={5} />
          </Box>
        </HStack>
      </Skeleton>
    </Box>
  );
};

export default AppointmentsPage;
