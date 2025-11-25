import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { Calendar, TrendingUp } from 'lucide-react';

// Sample data
const generateData = () => [
  { month: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { month: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { month: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { month: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { month: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
  { month: 'Aug', revenue: 4200, expenses: 2100, profit: 2100 },
  { month: 'Sep', revenue: 3800, expenses: 2800, profit: 1000 },
  { month: 'Oct', revenue: 4500, expenses: 2200, profit: 2300 },
  { month: 'Nov', revenue: 5200, expenses: 2600, profit: 2600 },
  { month: 'Dec', revenue: 6100, expenses: 3100, profit: 3000 }
];

// Reusable Dropdown Component
const Dropdown = ({ label, value, onChange, options, icon: Icon }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      {Icon && <Icon size={16} />}
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none cursor-pointer"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// Reusable Date Input Component
const DateInput = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
      <Calendar size={16} />
      {label}
    </label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2.5 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
    />
  </div>
);

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  
  return (
    <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-gray-200">
      <p className="font-bold text-gray-800 mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-semibold text-gray-800">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// Bar Chart Component
const BarChartWidget = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '14px' }} />
      <YAxis stroke="#6b7280" style={{ fontSize: '14px' }} />
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        wrapperStyle={{ paddingTop: '20px' }}
        iconType="circle"
      />
      <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
      <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
      <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

// Line Chart Component
const LineChartWidget = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '14px' }} />
      <YAxis stroke="#6b7280" style={{ fontSize: '14px' }} />
      <Tooltip content={<CustomTooltip />} />
      <Legend 
        wrapperStyle={{ paddingTop: '20px' }}
        iconType="circle"
      />
      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
      <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
      <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
    </LineChart>
  </ResponsiveContainer>
);

// Pie Chart Component
const PieChartWidget = ({ data }) => {
  const pieData = [
    { name: 'Revenue', value: data.reduce((sum, d) => sum + d.revenue, 0), color: '#3b82f6' },
    { name: 'Expenses', value: data.reduce((sum, d) => sum + d.expenses, 0), color: '#ef4444' }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Main Component
export default function ChartWidgetCustomization() {
  const allData = generateData();
  const [chartType, setChartType] = useState('bar');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  const filteredData = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    
    return allData.filter((_, index) => index >= startMonth && index <= endMonth);
  }, [startDate, endDate]);

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' }
  ];

  const renderChart = () => {
    switch(chartType) {
      case 'bar':
        return <BarChartWidget data={filteredData} />;
      case 'line':
        return <LineChartWidget data={filteredData} />;
      case 'pie':
        return <PieChartWidget data={filteredData} />;
      default:
        return <BarChartWidget data={filteredData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <TrendingUp size={32} />
              3. Chart Widget Customization
            </h1>
          </div>

          {/* Controls */}
          <div className="p-8 bg-gray-50 border-b-2 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Dropdown
                label="Chart Type"
                value={chartType}
                onChange={setChartType}
                options={chartTypes}
                icon={TrendingUp}
              />
              <DateInput
                label="Start Date"
                value={startDate}
                onChange={setStartDate}
              />
              <DateInput
                label="End Date"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          </div>

          {/* Chart Display */}
          <div className="p-8">
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
              {renderChart()}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                <div className="text-sm font-semibold text-blue-600 mb-1">Total Revenue</div>
                <div className="text-2xl font-bold text-blue-900">
                  ${filteredData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200">
                <div className="text-sm font-semibold text-red-600 mb-1">Total Expenses</div>
                <div className="text-2xl font-bold text-red-900">
                  ${filteredData.reduce((sum, d) => sum + d.expenses, 0).toLocaleString()}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200">
                <div className="text-sm font-semibold text-green-600 mb-1">Net Profit</div>
                <div className="text-2xl font-bold text-green-900">
                  ${filteredData.reduce((sum, d) => sum + d.profit, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}