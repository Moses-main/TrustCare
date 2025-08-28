import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClockIcon, 
  ChartBarIcon, 
  FolderIcon, 
  ClipboardListIcon, 
  ExclamationCircleIcon,
  PlusIcon
} from '@heroicons/react/outline';

const stats = [
  { name: 'Upcoming Appointments', value: '2', change: '+1', changeType: 'increase' },
  { name: 'Pending Lab Results', value: '3', change: '+1', changeType: 'increase' },
  { name: 'Active Medications', value: '5', change: '0', changeType: 'no-change' },
  { name: 'Active Alerts', value: '1', change: '0', changeType: 'no-change' },
];

const quickActions = [
  {
    name: 'Schedule Appointment',
    href: '/appointments/new',
    icon: PlusIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
  },
  {
    name: 'Upload Document',
    href: '/documents/upload',
    icon: FolderIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    name: 'Add Medication',
    href: '/medications/add',
    icon: ClipboardListIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    name: 'View Alerts',
    href: '/alerts',
    icon: ExclamationCircleIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'Lab Result',
    name: 'Blood Test Results',
    date: '2h ago',
    datetime: '2023-07-18T10:30:00',
  },
  {
    id: 2,
    type: 'Appointment',
    name: 'Annual Checkup',
    date: 'Yesterday',
    datetime: '2023-07-17T14:30:00',
  },
  {
    id: 3,
    type: 'Prescription',
    name: 'Ibuprofen',
    date: '2 days ago',
    datetime: '2023-07-16T09:30:00',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, John!</h2>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your health today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              <div className="mt-2">
                <span
                  className={classNames(
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-gray-500',
                    'text-sm font-medium'
                  )}
                >
                  {stat.change}
                </span>{' '}
                <span className="text-sm text-gray-500">from last week</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <span
                    className={classNames(
                      action.iconBackground,
                      action.iconForeground,
                      'inline-flex items-center justify-center h-12 w-12 rounded-lg'
                    )}
                  >
                    <action.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{action.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={classNames(
                            activity.type === 'Lab Result' ? 'bg-green-500' : 
                            activity.type === 'Appointment' ? 'bg-blue-500' : 'bg-purple-500',
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          )}
                        >
                          {activity.type === 'Lab Result' && (
                            <ClipboardListIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          )}
                          {activity.type === 'Appointment' && (
                            <ClockIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          )}
                          {activity.type === 'Prescription' && (
                            <ClipboardListIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.name}{' '}
                            <span className="font-medium text-gray-900">{activity.type}</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={activity.datetime}>{activity.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <Link
              to="/activity"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all activity<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
