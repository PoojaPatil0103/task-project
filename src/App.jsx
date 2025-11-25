import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import DateTimePicker from './components/DateTimePicker/DateTimePicker';
import MultiSelectDropdown from './components/MultiDropdown/MultiSelectDropdown';
import MultiDocumentUpload from './components/MultiDocument/MultiDocumentUpload';
import ChartWidgetCustomization from './components/Chart/ChartWidgetCustomization';
import NotificationDemo from './components/NotificationDemo';
import AIAssistantApp from './components/AI/AIAssistantApp';


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">Firebase Integration Demo</h1>

          <nav className="flex justify-center gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/ai"
              className={({ isActive }) => `px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200'}`}
            >
              AI Image Gen
            </NavLink>
          </nav>

          <Routes>
            {/* Dashboard landing: one-card-per-feature (links to dedicated pages) */}
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <FeatureCard to="/calendar" title="Calendar" desc="Open calendar / date-time picker" />
                  <FeatureCard to="/dropdown" title="Multi Select Dropdown" desc="Select multiple options" />
                  <FeatureCard to="/documents" title="Multi Document Upload" desc="Upload multiple documents" />
                  <FeatureCard to="/chart" title="Chart Widget" desc="Customize charts" />
                  <FeatureCard to="/notifications" title="Notifications" desc="Push notifications demo" />
                  <FeatureCard to="/ai" title="AI Image Gen" desc="Generate AI images" />
                </div>
              }
            />

            {/* Individual feature routes (one-per-page) */}
            <Route path="/calendar" element={<PageWrapper title="Calendar"><DateTimePicker /></PageWrapper>} />
            <Route path="/dropdown" element={<PageWrapper title="Multi Select Dropdown"><MultiSelectDropdown /></PageWrapper>} />
            <Route path="/documents" element={<PageWrapper title="Multi Document Upload"><MultiDocumentUpload /></PageWrapper>} />
            <Route path="/chart" element={<PageWrapper title="Chart Widget"><ChartWidgetCustomization /></PageWrapper>} />
            <Route path="/notifications" element={<PageWrapper title="Notifications"><NotificationDemo /></PageWrapper>} />

            {/* Dedicated AI route */}
            <Route path="/ai" element={<PageWrapper title="AI Image Gen"><AIAssistantApp /></PageWrapper>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Small presentational components used above
function FeatureCard({ to, title, desc }) {
  return (
    <Link to={to} className="block bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
      <div className="mt-4 text-sm text-blue-600 font-medium">Open →</div>
    </Link>
  );
}

function PageWrapper({ title, children }) {
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link to="/" className="text-sm text-blue-600 bg-white border px-3 py-1 rounded hover:bg-gray-50">Back to Dashboard</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
