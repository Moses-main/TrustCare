// Appointment statuses
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
  RESCHEDULED: 'rescheduled'
};

// Status display names
export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUS.SCHEDULED]: 'Scheduled',
  [APPOINTMENT_STATUS.CONFIRMED]: 'Confirmed',
  [APPOINTMENT_STATUS.IN_PROGRESS]: 'In Progress',
  [APPOINTMENT_STATUS.COMPLETED]: 'Completed',
  [APPOINTMENT_STATUS.CANCELLED]: 'Cancelled',
  [APPOINTMENT_STATUS.NO_SHOW]: 'No Show',
  [APPOINTMENT_STATUS.RESCHEDULED]: 'Rescheduled'
};

// Status colors for UI elements
export const APPOINTMENT_STATUS_COLORS = {
  [APPOINTMENT_STATUS.SCHEDULED]: 'blue',
  [APPOINTMENT_STATUS.CONFIRMED]: 'green',
  [APPOINTMENT_STATUS.IN_PROGRESS]: 'orange',
  [APPOINTMENT_STATUS.COMPLETED]: 'purple',
  [APPOINTMENT_STATUS.CANCELLED]: 'red',
  [APPOINTMENT_STATUS.NO_SHOW]: 'red',
  [APPOINTMENT_STATUS.RESCHEDULED]: 'teal'
};

// Status icons
import { 
  CalendarIcon, 
  CheckIcon, 
  TimeIcon, 
  WarningIcon, 
  CloseIcon, 
  RepeatIcon,
  InfoIcon 
} from '@chakra-ui/icons';

export const APPOINTMENT_STATUS_ICONS = {
  [APPOINTMENT_STATUS.SCHEDULED]: CalendarIcon,
  [APPOINTMENT_STATUS.CONFIRMED]: CheckIcon,
  [APPOINTMENT_STATUS.IN_PROGRESS]: TimeIcon,
  [APPOINTMENT_STATUS.COMPLETED]: CheckIcon,
  [APPOINTMENT_STATUS.CANCELLED]: CloseIcon,
  [APPOINTMENT_STATUS.NO_SHOW]: WarningIcon,
  [APPOINTMENT_STATUS.RESCHEDULED]: RepeatIcon
};

// Appointment types (services)
export const APPOINTMENT_TYPES = [
  'General Consultation',
  'Follow-up Visit',
  'Annual Checkup',
  'Vaccination',
  'Lab Test',
  'Procedure',
  'Therapy Session',
  'Emergency Visit',
  'Other'
];

// Time slots for appointment scheduling
export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

// Default appointment duration in minutes
export const DEFAULT_APPOINTMENT_DURATION = 30;

// Timezone to use for all date/time operations
export const TIMEZONE = 'UTC'; // or 'America/New_York', etc.

// Default working hours for the clinic
// Format: { day: [startTime, endTime] }, where times are in 24-hour format
export const DEFAULT_WORKING_HOURS = {
  1: ['09:00', '17:00'], // Monday
  2: ['09:00', '17:00'], // Tuesday
  3: ['09:00', '17:00'], // Wednesday
  4: ['09:00', '17:00'], // Thursday
  5: ['09:00', '17:00'], // Friday
  6: ['09:00', '13:00'], // Saturday
  0: null // Sunday - closed
};

// Export all as a single object for easier imports
export default {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_LABELS,
  APPOINTMENT_STATUS_COLORS,
  APPOINTMENT_STATUS_ICONS,
  APPOINTMENT_TYPES,
  TIME_SLOTS,
  DEFAULT_APPOINTMENT_DURATION,
  TIMEZONE,
  DEFAULT_WORKING_HOURS
};
