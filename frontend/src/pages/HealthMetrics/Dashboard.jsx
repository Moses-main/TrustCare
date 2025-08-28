import React, { useState } from 'react';
import { 
  FaChartBar as ChartBarIcon, 
  FaArrowUp as ArrowUpIcon, 
  FaArrowDown as ArrowDownIcon, 
  FaChartLine as TrendingUpIcon, 
  FaChartLine as TrendingDownIcon, 
  FaExpandArrowsAlt as ArrowsExpandIcon,
  FaClock as ClockIcon,
  FaCalendarAlt as CalendarIcon,
  FaPlus as PlusIcon,
  FaHeart as HeartIcon,
  FaWeight as ScaleIcon
} from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const timeRanges = [
  { id: 'week', name: 'Week' },
  { id: 'month', name: 'Month' },
  { id: '3months', name: '3 Months' },
  { id: 'year', name: 'Year' },
];

const metrics = [
  { id: 'bloodPressure', name: 'Blood Pressure', unit: 'mmHg', icon: HeartIcon, color: 'red' },
  { id: 'heartRate', name: 'Heart Rate', unit: 'bpm', icon: HeartIcon, color: 'blue' },
  { id: 'weight', name: 'Weight', unit: 'kg', icon: ScaleIcon, color: 'green' },
  { id: 'glucose', name: 'Blood Glucose', unit: 'mg/dL', icon: TrendingUpIcon, color: 'purple' },
];

// Sample data - in a real app, this would come from an API
const generateSampleData = (metricId, timeRange) => {
  // This is simplified - in a real app, you'd have more sophisticated data generation
  const now = new Date();
  let labels = [];
  let data = [];
  
  if (timeRange === 'week') {
    // Last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      data.push(Math.floor(Math.random() * 20) + (metricId === 'bloodPressure' ? 100 : 
                metricId === 'heartRate' ? 60 : 
                metricId === 'weight' ? 60 : 80));
    }
  } else if (timeRange === 'month') {
    // Last 4 weeks
    for (let i = 3; i >= 0; i--) {
      labels.push(`Week ${4 - i}`);
      data.push(Math.floor(Math.random() * 20) + (metricId === 'bloodPressure' ? 100 : 
                metricId === 'heartRate' ? 60 : 
                metricId === 'weight' ? 60 : 80));
    }
  } else if (timeRange === '3months') {
    // Last 3 months
    for (let i = 2; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
      data.push(Math.floor(Math.random() * 20) + (metricId === 'bloodPressure' ? 100 : 
                metricId === 'heartRate' ? 60 : 
                metricId === 'weight' ? 60 : 80));
    }
  } else {
    // Last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
      data.push(Math.floor(Math.random() * 20) + (metricId === 'bloodPressure' ? 100 : 
                metricId === 'heartRate' ? 60 : 
                metricId === 'weight' ? 60 : 80));
    }
  }

  return { labels, data };
};

const HealthMetricsDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [timeRange, setTimeRange] = useState('week');
  const [showAddMetricModal, setShowAddMetricModal] = useState(false);
  const [newMetric, setNewMetric] = useState({
    name: '',
    value: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().substring(0, 5)
  });

  const { labels, data } = generateSampleData(selectedMetric.id, timeRange);

  const chartData = {
    labels,
    datasets: [
      {
        label: selectedMetric.name,
        data,
        borderColor: selectedMetric.color,
        backgroundColor: `${selectedMetric.color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${selectedMetric.name}: ${context.raw} ${selectedMetric.unit}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: selectedMetric.unit,
        },
      },
    },
  };

  const handleAddMetric = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('Adding new metric:', newMetric);
    setShowAddMetricModal(false);
    setNewMetric({
      name: '',
      value: '',
      unit: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Health Metrics Dashboard</h2>
          <button
            type="button"
            onClick={() => setShowAddMetricModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Metric
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === range.id
                    ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                } border ${range.id === 'week' ? 'rounded-l-md' : 'border-l-0'} ${
                  range.id === 'year' ? 'rounded-r-md' : ''}
                `}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric)}
              className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-200 ${
                selectedMetric.id === metric.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
              }`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 bg-${metric.color}-100 p-3 rounded-md`}>
                    <metric.icon className={`h-6 w-6 text-${metric.color}-600`} aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {Math.floor(Math.random() * 20) + (metric.id === 'bloodPressure' ? 100 : 
                            metric.id === 'heartRate' ? 60 : 
                            metric.id === 'weight' ? 60 : 80)}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                          <span className="sr-only">Increased by</span>
                          {Math.floor(Math.random() * 10) + 1}%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="md:flex md:items-center md:justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                {selectedMetric.name} Trend
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  {timeRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Entries
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your most recent {selectedMetric.name.toLowerCase()} measurements.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {data.map((value, index) => {
                const date = new Date();
                date.setDate(date.getDate() - (data.length - 1 - index));
                
                return (
                  <li key={index}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            {selectedMetric.name}
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedMetric.trend === 'up' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {selectedMetric.trend === 'up' ? '↑' : '↓'} {selectedMetric.change}%
                            </span>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="text-sm text-gray-500">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <span className="text-lg font-semibold text-gray-900">
                              {value}
                            </span>
                            <span className="ml-1">{selectedMetric.unit}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Metric Modal */}
      {showAddMetricModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add New Metric Entry
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="metric" className="block text-sm font-medium text-gray-700 text-left">
                        Metric
                      </label>
                      <select
                        id="metric"
                        name="metric"
                        value={newMetric.name}
                        onChange={(e) => setNewMetric({...newMetric, name: e.target.value})}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select a metric</option>
                        {metrics.map((metric) => (
                          <option key={metric.id} value={metric.name}>
                            {metric.name} ({metric.unit})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="value" className="block text-sm font-medium text-gray-700 text-left">
                        Value
                      </label>
                      <input
                        type="number"
                        name="value"
                        id="value"
                        value={newMetric.value}
                        onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter value"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 text-left">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={newMetric.date}
                          onChange={(e) => setNewMetric({...newMetric, date: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 text-left">
                          Time
                        </label>
                        <input
                          type="time"
                          name="time"
                          id="time"
                          value={newMetric.time}
                          onChange={(e) => setNewMetric({...newMetric, time: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 text-left">
                        Notes (optional)
                      </label>
                      <textarea
                        name="notes"
                        id="notes"
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Any additional notes about this entry"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Add Entry
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMetricModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetricsDashboard;
