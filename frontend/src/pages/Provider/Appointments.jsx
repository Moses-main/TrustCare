import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Box, 
  Heading, 
  Button, 
  useDisclosure, 
  Flex, 
  Spinner,
  useToast,
  Text,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Select,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Badge,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Tooltip
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  CalendarIcon, 
  ChevronDownIcon, 
  TimeIcon, 
  CheckIcon, 
  CloseIcon,
  RepeatIcon,
  InfoOutlineIcon
} from '@chakra-ui/icons';
import { format, parseISO, isToday, isTomorrow, isThisWeek, isAfter, isBefore, addDays, startOfDay, endOfDay } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentsAPI } from '../../services/api';
import AppointmentList from '../../components/Appointments/AppointmentList';
import AppointmentDetails from '../../components/Appointments/AppointmentDetails';
import { APPOINTMENT_STATUS, APPOINTMENT_STATUS_COLORS } from '../../constants/appointments';

// Status filter options
const STATUS_FILTERS = {
  ALL: 'all',
  ...APPOINTMENT_STATUS
};

// Date filter options
const DATE_FILTERS = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  THIS_WEEK: 'this_week',
  NEXT_WEEK: 'next_week',
  CUSTOM: 'custom'
};

const ProviderAppointments = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    status: STATUS_FILTERS.ALL,
    dateRange: DATE_FILTERS.TODAY,
    searchQuery: '',
    startDate: new Date(),
    endDate: addDays(new Date(), 7)
  });
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Fetch appointments
  const fetchAppointments = useCallback(async () => {
    if (!user?.userId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await appointmentsAPI.getProviderAppointments(user.userId);
      setAppointments(response.data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load appointments. Please try again.',
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

  // Filter appointments based on filters
  useEffect(() => {
    if (!appointments.length) {
      setFilteredAppointments([]);
      return;
    }

    let result = [...appointments];

    // Filter by status
    if (filters.status !== STATUS_FILTERS.ALL) {
      result = result.filter(apt => apt.status === filters.status);
    }

    // Filter by date range
    const now = new Date();
    switch (filters.dateRange) {
      case DATE_FILTERS.TODAY:
        result = result.filter(apt => isToday(parseISO(apt.appointmentDate)));
        break;
      case DATE_FILTERS.TOMORROW:
        result = result.filter(apt => isTomorrow(parseISO(apt.appointmentDate)));
        break;
      case DATE_FILTERS.THIS_WEEK:
        result = result.filter(apt => isThisWeek(parseISO(apt.appointmentDate)));
        break;
      case DATE_FILTERS.NEXT_WEEK:
        const nextWeekStart = addDays(now, 7 - now.getDay());
        const nextWeekEnd = addDays(nextWeekStart, 6);
        result = result.filter(apt => {
          const aptDate = parseISO(apt.appointmentDate);
          return isAfter(aptDate, nextWeekStart) && isBefore(aptDate, nextWeekEnd);
        });
        break;
      case DATE_FILTERS.CUSTOM:
        result = result.filter(apt => {
          const aptDate = parseISO(apt.appointmentDate);
          return isAfter(aptDate, filters.startDate) && isBefore(aptDate, filters.endDate);
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

    // Sort by date (earliest first)
    result.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    
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
        description: `Appointment marked as ${newStatus}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Error updating appointment status:', err);
      toast({
        title: 'Error',
        description: 'Failed to update appointment status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle appointment selection
  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get appointment stats
  const appointmentStats = useMemo(() => {
    const stats = {
      total: appointments.length,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0
    };

    appointments.forEach(apt => {
      if (apt.status === APPOINTMENT_STATUS.SCHEDULED) stats.scheduled++;
      else if (apt.status === APPOINTMENT_STATUS.COMPLETED) stats.completed++;
      else if (apt.status === APPOINTMENT_STATUS.CANCELLED) stats.cancelled++;
      else if (apt.status === APPOINTMENT_STATUS.NO_SHOW) stats.noShow++;
    });

    return stats;
  }, [appointments]);
          description: 'Failed to load appointments',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [providerId]);

  const filterAppointments = () => {
    const now = new Date();
    let filtered = [...appointments];

    // Apply date filter
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(apt => isToday(new Date(apt.appointmentDate)));
        break;
      case 'tomorrow':
        filtered = filtered.filter(apt => isTomorrow(new Date(apt.appointmentDate)));
        break;
      case 'thisWeek':
        filtered = filtered.filter(apt => isThisWeek(new Date(apt.appointmentDate)));
        break;
      case 'upcoming':
        filtered = filtered.filter(apt => new Date(apt.appointmentDate) > now);
        break;
      case 'past':
        filtered = filtered.filter(apt => new Date(apt.appointmentDate) < now);
        break;
      default:
        break;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.patientId?.name?.toLowerCase().includes(query) ||
        apt.serviceType?.toLowerCase().includes(query) ||
        apt.appointmentId?.toLowerCase().includes(query)
      );
    }

    // Sort by date
    return filtered.sort((a, b) => 
      new Date(a.appointmentDate) - new Date(b.appointmentDate)
    );
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await axios.put(`/api/appointments/${appointmentId}/status`, { status: newStatus });
      
      setAppointments(prevAppointments =>
        prevAppointments.map(apt =>
          apt._id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
      
      toast({
        title: 'Success',
        description: `Appointment marked as ${newStatus}`,
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

  const filteredAppointments = filterAppointments();
  const upcomingAppointments = filteredAppointments.filter(
    apt => new Date(apt.appointmentDate) >= new Date()
  );
  
  const pastAppointments = filteredAppointments.filter(
    apt => new Date(apt.appointmentDate) < new Date()
  );

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Heading as="h1" size="xl">Appointments</Heading>
        
        <HStack spacing={4} flexWrap="wrap">
          <Select 
            value={dateFilter} 
          >
            <option value={DATE_FILTERS.TODAY}>Today</option>
            <option value={DATE_FILTERS.TOMORROW}>Tomorrow</option>
            <option value={DATE_FILTERS.THIS_WEEK}>This Week</option>
            <option value={DATE_FILTERS.NEXT_WEEK}>Next Week</option>
            <option value={DATE_FILTERS.CUSTOM}>Custom Range</option>
          </Select>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              size={isMobile ? 'md' : 'lg'}
              minW="150px"
              textAlign="left"
            >
              {filters.status === STATUS_FILTERS.ALL ? 'All Status' : filters.status}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleFilterChange('status', STATUS_FILTERS.ALL)}>
                All Status
              </MenuItem>
              {Object.values(APPOINTMENT_STATUS).map(status => (
                <MenuItem 
                  key={status} 
                  onClick={() => handleFilterChange('status', status)}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Box 
                    w="10px" 
                    h="10px" 
                    borderRadius="full" 
                    bg={APPOINTMENT_STATUS_COLORS[status] || 'gray.300'}
                  />
                  {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' ')}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          <Tooltip label="Refresh appointments">
            <IconButton
              icon={<RepeatIcon />}
              onClick={fetchAppointments}
              aria-label="Refresh"
              size={isMobile ? 'md' : 'lg'}
              isLoading={loading}
            />
          </Tooltip>
        </HStack>
      </Flex>
      
      {filters.dateRange === DATE_FILTERS.CUSTOM && (
        <Flex mt={4} gap={4} flexWrap="wrap">
          <FormControl maxW="200px">
            <FormLabel fontSize="sm">Start Date</FormLabel>
            <Input
              type="date"
              value={format(filters.startDate, 'yyyy-MM-dd')}
              onChange={(e) => handleFilterChange('startDate', new Date(e.target.value))}
              size={isMobile ? 'md' : 'sm'}
            />
          </FormControl>
          <FormControl maxW="200px">
            <FormLabel fontSize="sm">End Date</FormLabel>
            <Input
              type="date"
              value={format(filters.endDate, 'yyyy-MM-dd')}
              onChange={(e) => handleFilterChange('endDate', new Date(e.target.value))}
              min={format(filters.startDate, 'yyyy-MM-dd')}
              size={isMobile ? 'md' : 'sm'}
            />
          </FormControl>
        </Flex>
      )}
          <TabPanel p={4}>
            {pastAppointments.length > 0 ? (
              <AppointmentList 
                appointments={pastAppointments} 
                userType="provider"
                isPast
              />
            ) : (
              <Box textAlign="center" py={10} bg="gray.50" borderRadius="md">
                <Text fontSize="lg" color="gray.500">
                  No past appointments found.
                </Text>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProviderAppointments;
