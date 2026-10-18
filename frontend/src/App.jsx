import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/topbar";
import DashboardPage from "./Components/dashboardpage";
import Resume from "./Seekers/Resume";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-20"
          }`}
        >
          <Topbar toggleSidebar={toggleSidebar} />

          <main className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={<DashboardPage />} />

              <Route path="/dashboard/resume" element={<Resume />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
