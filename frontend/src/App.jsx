import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/topbar";
import DashboardPage from "./Components/dashboardpage";

// ─── Landing Pages ───
import Testimonial from "./landing/Testimonials";
import Jobs from "./landing/Jobs";

// Temporary Placeholders
const About = () => (
  <div className="p-10 text-center text-xl font-bold">
    About Page (Under Construction)
  </div>
);
const Services = () => (
  <div className="p-10 text-center text-xl font-bold">
    Services Page (Under Construction)
  </div>
);
const Applications = () => (
  <div className="p-10 text-center text-xl font-bold">
    Applications Page (Under Construction)
  </div>
);
const Login = () => (
  <div className="p-10 text-center text-xl font-bold">
    Login Page (Under Construction)
  </div>
);

// Seekers
import Resume from "./Seekers/Resume";
import Application from "./seekers/application";
import Interviews from "./seekers/Interviews";
import MyApplications from "./seekers/MyApplications";
import MyProfile from "./seekers/MyProfile";
import SDashboard from "./seekers/SDashboard";
import BrowseJobs from "./seekers/BrowseJobs";
import SavedJobs from "./seekers/SavedJobs";
import Reviewss from "./Seekers/Reviews";
import SeekerSupport from "./Seekers/SeekerSupport";

// Providers
import CompanyProfile from "./providers/CompanyProfile";
import AddCompany from "./providers/AddCompany";
import Addjob from "./providers/Addjob";
import Myjob from "./providers/Myjob";
import Applicants from "./providers/Applicants";
import ProviderSupport from "./providers/ProviderSupport";

// Admin
import AllJobs from "./admin/AllJobs";
import Approvals from "./admin/Approvals";
import ManageUsers from "./admin/ManageUsers";
import Categories from "./admin/Categories";
import Locations from "./admin/Locations";
import Support from "./admin/Support";
import AdminReview from "./admin/adminReview";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ═══════════════════════════════════════════
            PUBLIC LANDING PAGES (No Sidebar)
           ═══════════════════════════════════════════ */}
        <Route path="/" element={<Testimonial />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/login" element={<Login />} />

        {/* ═══════════════════════════════════════════
            DASHBOARD ROUTES (With Sidebar + Topbar)
           ═══════════════════════════════════════════ */}
        <Route
          path="/dashboard/*"
          element={
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
                    <Route index element={<DashboardPage />} />

                    {/* ─── Job Seeker ─── */}
                    <Route path="sdashboard" element={<SDashboard />} />
                    <Route path="myprofile" element={<MyProfile />} />
                    <Route path="resume" element={<Resume />} />
                    <Route path="browsejobs" element={<BrowseJobs />} />
                    <Route path="saved-jobs" element={<SavedJobs />} />
                    <Route path="applications" element={<Application />} />
                    <Route path="myapplications" element={<MyApplications />} />
                    <Route path="interviews" element={<Interviews />} />
                    <Route path="reviews" element={<Reviewss />} />
                    <Route path="SeekerSupport" element={<SeekerSupport />} />

                    {/* ─── Job Provider ─── */}
                    <Route path="company" element={<CompanyProfile />} />
                    <Route path="add-company" element={<AddCompany />} />
                    <Route path="post-job" element={<Addjob />} />
                    <Route path="my-jobs" element={<Myjob />} />
                    <Route path="applicants" element={<Applicants />} />
                    <Route path="ProviderSupport" element={<ProviderSupport />} />

                    {/* ─── Admin ─── */}
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="approvals" element={<Approvals />} />
                    <Route path="all-jobs" element={<AllJobs />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="locations" element={<Locations />} />
                    <Route path="support" element={<Support />} />
                    <Route path="admin-review" element={<AdminReview />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />

        {/* Global Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;