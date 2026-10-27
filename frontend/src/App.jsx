import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ─── Layout ───
import Sidebar from "./Layouts/Sidebar";
import Topbar from "./Layouts/TopBar";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";

// ─── Landing Pages ───
import Home from "./landing/Home";
import Contact from "./landing/Contect"; 
import Testimonials from "./landing/Testimonials";
import Jobs from "./landing/Jobs";
import Services from "./landing/Services";
import Login from "./landing/Login";
import About from "./landing/About";

// ─── Seekers ───
import Resume from "./seekers/Resume";
import Application from "./seekers/Application";
import Interviews from "./seekers/Interviews";
import MyApplications from "./seekers/MyApplications";
import MyProfile from "./seekers/MyProfile";
import SDashboard from "./seekers/SDashboard";
import SavedJobs from "./seekers/SavedJobs";
import Reviewss from "./seekers/Reviews";
import SeekerSupport from "./seekers/SeekerSupport";
import RegisterSeeker from "./seekers/RegisterSeeker";

// ─── Providers ───
import CompanyProfile from "./providers/CompanyProfile";
import AddCompany from "./providers/AddCompany";
import Addjob from "./providers/Addjob";
import Myjob from "./providers/Myjob";
import Applicants from "./providers/Applicants";
import ProviderSupport from "./providers/ProviderSupport";

// ─── Admin ───
import DashboardPage from "./admin/DashboardPage";
import AllJobs from "./admin/AllJobs";
import Approvals from "./admin/Approvals";
import ManageUsers from "./admin/ManageUsers";
import Categories from "./admin/Categories";
import Locations from "./admin/Locations";
import Support from "./admin/Support";
import AdminReview from "./admin/adminReview";
import ContactMsg from "./admin/ContactMsg"
import Staff from "./admin/Staff";
import Reports from "./admin/Reports";
import AddStaff from "./admin/Addstaff";

// 🌐 PUBLIC LAYOUT (Navbar aur Footer ke saath)
const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 mt-20"> {/* mt-20 added so content doesn't hide under fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <Routes>
        
        {/* PUBLIC + SEEKER + PROVIDER PAGES (Navbar ke saath) */}
        <Route element={<PublicLayout />}>
          
          {/* Public Landing */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* ─── Job Seeker (Moved here under Navbar) ─── */}
          <Route path="/sdashboard" element={<SDashboard />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/myapplications" element={<MyApplications />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/reviews" element={<Reviewss />} />
          <Route path="/SeekerSupport" element={<SeekerSupport />} />
          <Route path="/register-seeker" element={<RegisterSeeker />} />

          {/* ─── Job Provider (Moved here under Navbar) ─── */}
          <Route path="/company" element={<CompanyProfile />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/post-job" element={<Addjob />} />
          <Route path="/my-jobs" element={<Myjob />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/ProviderSupport" element={<ProviderSupport />} />
          
        </Route>

        {/* Login Page without Navbar/Footer (Full screen) */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD ROUTES (Only Admin left here with Sidebar) */}
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

                    {/* ─── Admin ONLY ─── */}
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="approvals" element={<Approvals />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="add-staff" element={<AddStaff />} />
                    <Route path="all-jobs" element={<AllJobs />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="locations" element={<Locations />} />
                    <Route path="support" element={<Support />} />
                    <Route path="admin-review" element={<AdminReview />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="ContactMsg" element={<ContactMsg />} />

                    {/* Dashboard Fallback */}
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