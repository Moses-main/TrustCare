import React from 'react';
import { Link } from 'react-router-dom';

// Example IDs for dynamic routes
const EXAMPLE_PATIENT_ID = '123';
const EXAMPLE_APPOINTMENT_ID = 'appt-456';
const EXAMPLE_DOCUMENT_ID = 'doc-789';

const TestRoutes = () => {
  // Common patient routes with example data
  const patientRoutes = [
    { path: '/patient', label: 'Patient Dashboard' },
    { 
      path: `/patient/appointments/${EXAMPLE_APPOINTMENT_ID}`, 
      label: 'View Appointment' 
    },
    { 
      path: '/patient/medical-records', 
      label: 'Medical Records',
      description: 'View all medical records'
    },
    { 
      path: `/patient/medical-records/${EXAMPLE_DOCUMENT_ID}`, 
      label: 'View Medical Record',
      description: `View specific record (ID: ${EXAMPLE_DOCUMENT_ID})`
    },
    { 
      path: '/patient/billing', 
      label: 'Billing',
      description: 'View and manage bills'
    },
    { 
      path: '/patient/messages', 
      label: 'Messages',
      description: 'View and send messages'
    },
    { 
      path: '/patient/profile', 
      label: 'Profile',
      description: 'View and edit profile'
    },
    { 
      path: '/patient/settings', 
      label: 'Settings',
      description: 'Account and notification settings'
    }
  ];

  // Provider-specific routes
  const providerRoutes = [
    { path: '/provider', label: 'Provider Dashboard' },
    { 
      path: '/provider/patients', 
      label: 'Patient List',
      description: 'View all patients'
    },
    { 
      path: `/provider/patients/${EXAMPLE_PATIENT_ID}`, 
      label: 'Patient Details',
      description: `View patient details (ID: ${EXAMPLE_PATIENT_ID})`
    },
    { 
      path: `/provider/patient/${EXAMPLE_PATIENT_ID}/timeline`, 
      label: 'Patient Timeline',
      description: `View patient timeline (ID: ${EXAMPLE_PATIENT_ID})`
    },
    { 
      path: `/provider/patient/${EXAMPLE_PATIENT_ID}/metrics`, 
      label: 'Patient Metrics',
      description: `View patient metrics (ID: ${EXAMPLE_PATIENT_ID})`
    },
    { 
      path: `/provider/patient/${EXAMPLE_PATIENT_ID}/documents`, 
      label: 'Patient Documents',
      description: `View patient documents (ID: ${EXAMPLE_PATIENT_ID})`
    },
    { 
      path: `/provider/patient/${EXAMPLE_PATIENT_ID}/medications`, 
      label: 'Patient Medications',
      description: `View patient medications (ID: ${EXAMPLE_PATIENT_ID})`
    },
    { 
      path: `/provider/patient/${EXAMPLE_PATIENT_ID}/alerts`, 
      label: 'Patient Alerts',
      description: `View patient alerts (ID: ${EXAMPLE_PATIENT_ID})`
    },
    { 
      path: '/provider/access-control', 
      label: 'Access Control',
      description: 'Manage access permissions'
    }
  ];

  // Public routes
  const publicRoutes = [
    { path: '/', label: 'Home (Landing Page)' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
    { path: '/unauthorized', label: 'Unauthorized' }
  ];

  // Combine all routes
  const allRoutes = [
    { section: 'Public Routes', routes: publicRoutes },
    { section: 'Patient Routes', routes: patientRoutes },
    { section: 'Provider Routes', routes: providerRoutes }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Test Routes</h1>
      
      {allRoutes.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
            {section.section}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.routes.map((route, routeIndex) => (
              <Link
                key={routeIndex}
                to={route.path}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 
                         transition-colors hover:shadow-md h-full"
              >
                <div className="font-medium text-blue-600">{route.label}</div>
                <div className="text-sm text-gray-500 mb-1">{route.path}</div>
                {route.description && (
                  <div className="text-xs text-gray-400 mt-1">{route.description}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestRoutes;
