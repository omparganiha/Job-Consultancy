import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/topbar";
import DashboardPage from "./Components/dashboardpage";

// Seekers
import Resume from "./Seekers/Resume";
import Application from "./seekers/Application";

// Providers
import CompanyProfile from "./providers/CompanyProfile";
import AddCompany from "./providers/AddCompany";
import Addjob from "./providers/Addjob";
import Myjob from "./providers/Myjob";


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

              {/* Job Seeker Routes */}
              <Route path="/dashboard/resume" element={<Resume />} />
              <Route path="/dashboard/applications" element={<Application />} />

              {/* Job Provider Routes */}
              <Route path="/dashboard/company" element={<CompanyProfile />} />
              <Route path="/dashboard/add-company" element={<AddCompany />} />
              <Route path="/dashboard/post-job" element={<Addjob />} />
              <Route path="/dashboard/my-jobs" element={<Myjob />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;