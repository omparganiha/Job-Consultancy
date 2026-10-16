import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import DashboardPage from './components/dashboardpage';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
          <Topbar toggleSidebar={toggleSidebar} />

          <main className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;