import React, { useState } from 'react';
import { FaHeartbeat, FaWeight, FaThermometerHalf, FaTint, FaPlus } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all ChartJS components
Chart.register(...registerables);

const HealthMetrics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMetric, setShowAddMetric] = useState(false);
  const [newMetric, setNewMetric] = useState({
    type: 'bloodPressure',
    value: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Mock data for health metrics
  const metrics = {
    bloodPressure: {
      label: 'Blood Pressure',
      unit: 'mmHg',
      icon: <FaHeartbeat className="text-red-500 text-2xl" />,
      data: [
        { date: '2023-01-01', value: '120/80' },
        { date: '2023-02-01', value: '122/82' },
        { date: '2023-03-01', value: '118/78' },
        { date: '2023-04-01', value: '125/85' },
        { date: '2023-05-01', value: '121/79' },
        { date: '2023-06-01', value: '119/81' },
      ]
    },
    weight: {
      label: 'Weight',
      unit: 'kg',
      icon: <FaWeight className="text-blue-500 text-2xl" />,
      data: [
        { date: '2023-01-01', value: 75 },
        { date: '2023-02-01', value: 74 },
        { date: '2023-03-01', value: 73 },
        { date: '2023-04-01', value: 72 },
        { date: '2023-05-01', value: 71 },
        { date: '2023-06-01', value: 70 },
      ]
    },
    temperature: {
      label: 'Temperature',
      unit: '°C',
      icon: <FaThermometerHalf className="text-orange-500 text-2xl" />,
      data: [
        { date: '2023-01-01', value: 36.8 },
        { date: '2023-02-01', value: 36.9 },
        { date: '2023-03-01', value: 36.7 },
        { date: '2023-04-01', value: 36.8 },
        { date: '2023-05-01', value: 36.9 },
        { date: '2023-06-01', value: 37.0 },
      ]
    },
    bloodOxygen: {
      label: 'Blood Oxygen',
      unit: '%',
      icon: <FaTint className="text-blue-300 text-2xl" />,
      data: [
        { date: '2023-01-01', value: 98 },
        { date: '2023-02-01', value: 97 },
        { date: '2023-03-01', value: 98 },
        { date: '2023-04-01', value: 99 },
        { date: '2023-05-01', value: 98 },
        { date: '2023-06-01', value: 97 },
      ]
    }
  };

  const getChartData = (metricKey) => {
    const metric = metrics[metricKey];
    return {
      labels: metric.data.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: metric.label,
          data: metric.data.map(item => 
            typeof item.value === 'string' ? parseInt(item.value.split('/')[0]) : item.value
          ),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Health Metrics Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const handleAddMetric = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Adding new metric:', newMetric);
    // Reset form
    setNewMetric({
      type: 'bloodPressure',
      value: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowAddMetric(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Health Metrics</h1>
        <button 
          onClick={() => setShowAddMetric(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          <span>Add Metric</span>
        </button>
      </div>

      {/* Add Metric Modal */}
      {showAddMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Metric</h2>
            <form onSubmit={handleAddMetric}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Metric Type
                </label>
                <select
                  id="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newMetric.type}
                  onChange={(e) => setNewMetric({...newMetric, type: e.target.value})}
                  required
                >
                  <option value="bloodPressure">Blood Pressure</option>
                  <option value="weight">Weight</option>
                  <option value="temperature">Temperature</option>
                  <option value="bloodOxygen">Blood Oxygen</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                  Value
                </label>
                <input
                  type="text"
                  id="value"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newMetric.value}
                  onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
                  placeholder={newMetric.type === 'bloodPressure' ? 'e.g., 120/80' : 'Enter value'}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newMetric.date}
                  onChange={(e) => setNewMetric({...newMetric, date: e.target.value})}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newMetric.notes}
                  onChange={(e) => setNewMetric({...newMetric, notes: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddMetric(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save Metric
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            {Object.keys(metrics).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {metrics[key].icon}
                <span className="ml-2">{metrics[key].label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(metrics).map(([key, metric]) => {
            const latest = metric.data[metric.data.length - 1];
            return (
              <div key={key} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-blue-50">
                    {metric.icon}
                  </div>
                  <button 
                    onClick={() => setActiveTab(key)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>
                </div>
                <h3 className="text-lg font-medium text-gray-500 mt-4">{metric.label}</h3>
                <p className="text-3xl font-bold text-gray-900">
                  {typeof latest.value === 'number' 
                    ? latest.value.toLocaleString() 
                    : latest.value} {metric.unit}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Last updated: {new Date(latest.date).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {metrics[activeTab].label} History
          </h2>
          <div className="h-96">
            <Line data={getChartData(activeTab)} options={chartOptions} />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Entries</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {metrics[activeTab].data
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {typeof entry.value === 'number' 
                            ? entry.value.toLocaleString() 
                            : entry.value} {metrics[activeTab].unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {entry.notes || 'No notes'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetrics;
