import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import DashboardPage from "./components/dashboardpage";
import Resume from "./seekers/Resume";
import Application from "./seekers/Application";
import Interviews from "./seekers/Interviews";
import MyApplications from "./seekers/MyApplications";
import MyProfile from "./seekers/MyProfile";
import SDashboard from "./seekers/SDashboard";

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
               <Route path="/dashboard/sdashboard" element={<SDashboard />} />
               <Route path="/dashboard/myprofile" element={<MyProfile />} />
                <Route path="/dashboard/myapplications" element={<MyApplications />} />

              <Route path="/dashboard/resume" element={<Resume />} />
              <Route path="/dashboard/applications" element={<Application />} />
              <Route path="/dashboard/interviews" element={<Interviews />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
