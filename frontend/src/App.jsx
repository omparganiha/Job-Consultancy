import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/topbar";
import DashboardPage from "./Components/dashboardpage";

// Seekers
import Resume from "./Seekers/Resume";
import Application from "./seekers/Application";
import Interviews from "./seekers/Interviews";
import MyApplications from "./seekers/MyApplications";
import MyProfile from "./seekers/MyProfile";
import SDashboard from "./seekers/SDashboard";
import BrowseJobs from "./seekers/BrowseJobs";
import SavedJobs from "./seekers/SavedJobs";
import Reviews from "./Seekers/Reviews";


// Providers
import CompanyProfile from "./providers/CompanyProfile";
import AddCompany from "./providers/AddCompany";
import Addjob from "./providers/Addjob";
import Myjob from "./providers/Myjob";
import Applicants from "./providers/Applicants";

// Admin
import AllJobs from "./admin/AllJobs";
import Approvals from "./admin/Approvals";
import ManageUsers from "./admin/ManageUsers";
import Categories from "./admin/Categories";
import Locations from "./admin/Locations";
import Support from "./admin/Support";

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

              {/* Job Seeker */}
              <Route path="/dashboard/sdashboard" element={<SDashboard />} />
              <Route path="/dashboard/myprofile" element={<MyProfile />} />
              <Route path="/dashboard/resume" element={<Resume />} />
              <Route path="/dashboard/browsejobs" element={<BrowseJobs />} />
              <Route path="/dashboard/saved-jobs" element={<SavedJobs />} />
              <Route path="/dashboard/applications" element={<Application />} />
              <Route path="/dashboard/myapplications" element={<MyApplications />} />
              <Route path="/dashboard/interviews" element={<Interviews />} />
              <Route path="/dashboard/reviews" element={<Reviews />} />

              {/* Job Provider */}
              <Route path="/dashboard/company" element={<CompanyProfile />} />
              <Route path="/dashboard/add-company" element={<AddCompany />} />
              <Route path="/dashboard/post-job" element={<Addjob />} />
              <Route path="/dashboard/my-jobs" element={<Myjob />} />
              <Route path="/dashboard/applicants" element={<Applicants />} />

              {/* Admin */}
              <Route path="/dashboard/users" element={<ManageUsers />} />
              <Route path="/dashboard/approvals" element={<Approvals />} />
              <Route path="/dashboard/all-jobs" element={<AllJobs />} />
              <Route path="/dashboard/categories" element={<Categories />} />
              <Route path="/dashboard/locations" element={<Locations />} />
              <Route path="/dashboard/support" element={<Support />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;