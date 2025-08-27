import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
  HStack,
  Text,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

const serviceTypes = [
  { value: 'general-checkup', label: 'General Checkup' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'lab-test', label: 'Lab Test' },
  { value: 'vaccination', label: 'Vaccination' },
  { value: 'surgery', label: 'Surgery' },
  { value: 'therapy', label: 'Therapy' },
  { value: 'other', label: 'Other' },
];

const AppointmentForm = ({ patientId, providers, onSuccess }) => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectedService = watch('serviceType');

  useEffect(() => {
    // Reset selected time slot when date or provider changes
    setValue('timeSlot', '');
    if (selectedDate && selectedProvider) {
      fetchAvailableSlots(selectedProvider, selectedDate);
    }
  }, [selectedDate, selectedProvider]);

  const fetchAvailableSlots = async (providerId, date) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/appointments/slots/${providerId}/${date}`
      );
      setAvailableSlots(response.data.data || []);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch available time slots',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const appointmentData = {
        ...data,
        patientId,
        appointmentDate: new Date(`${data.date}T${data.timeSlot}`).toISOString(),
      };

      await axios.post('/api/appointments', appointmentData);
      
      toast({
        title: 'Success',
        description: 'Appointment booked successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to book appointment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button leftIcon={<CalendarIcon />} colorScheme="blue" onClick={onOpen}>
        Book Appointment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Book New Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Service Type</FormLabel>
                <Select
                  placeholder="Select service type"
                  {...register('serviceType', { required: true })}
                >
                  {serviceTypes.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Provider</FormLabel>
                <Select
                  placeholder="Select provider"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                >
                  {providers?.map((provider) => (
                    <option key={provider._id} value={provider._id}>
                      {provider.name} ({provider.specialty || 'General'})
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  min={format(new Date(), 'yyyy-MM-dd')}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Time Slot</FormLabel>
                {loading ? (
                  <Spinner />
                ) : availableSlots.length > 0 ? (
                  <HStack wrap="wrap" spacing={2}>
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant="outline"
                        onClick={() => setValue('timeSlot', slot.time)}
                        colorScheme={watch('timeSlot') === slot.time ? 'blue' : 'gray'}
                      >
                        {slot.formattedTime}
                      </Button>
                    ))}
                  </HStack>
                ) : (
                  <Text color="gray.500">
                    {selectedDate && selectedProvider
                      ? 'No available slots for the selected date'
                      : 'Please select a provider and date to see available time slots'}
                  </Text>
                )}
                <Input type="hidden" {...register('timeSlot', { required: true })} />
              </FormControl>

              <FormControl>
                <FormLabel>Notes (Optional)</FormLabel>
                <Textarea {...register('notes')} placeholder="Any additional information..." />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={loading}
              isDisabled={!watch('timeSlot')}
            >
              Book Appointment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppointmentForm;
