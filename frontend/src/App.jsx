import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// ─── Layouts ───
import Sidebar from "./Layouts/Sidebar";
import Topbar from "./Layouts/topbar";
import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";

// ─── Landing Pages ───
import Home from "./landing/Home";
import Jobs from "./landing/Jobs";
import Services from "./landing/Services";
import About from "./landing/About";
import Testimonials from "./landing/Testimonials";
import Contact from "./landing/Contect"; 
import Login from "./landing/Login";


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

// ─── Providers ───
import CompanyProfile from "./providers/CompanyProfile";
import AddCompany from "./providers/AddCompany";
import ProviderAddJob from "./providers/Addjob"; 
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
import AdminAddJob from "./admin/Addjob";
import InterviewList from "./admin/InterviewList";

// 🌐 PUBLIC LAYOUT (Navbar aur Footer ke saath)
const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
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
      <Routes>
        {/* PUBLIC LANDING PAGES  */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>

        {/* Login Page without Navbar/Footer (Full screen) */}
        <Route path="/login" element={<Login />} />
         {/* New Home Support Page */}

          {/* DASHBOARD ROUTES*/}
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
                    <Route path="saved-jobs" element={<SavedJobs />} />
                    <Route path="applications" element={<Application />} />
                    <Route path="myapplications" element={<MyApplications />} />
                    <Route path="interviews" element={<Interviews />} />
                    <Route path="reviews" element={<Reviewss />} />
                    <Route path="SeekerSupport" element={<SeekerSupport />} />

                    {/* ─── Job Provider ─── */}
                    <Route path="company" element={<CompanyProfile />} />
                    <Route path="add-company" element={<AddCompany />} />
                    <Route path="post-job" element={<ProviderAddJob />} /> {/* ✅ Updated yahan */}
                    <Route path="my-jobs" element={<Myjob />} />
                    <Route path="applicants" element={<Applicants />} />
                    <Route path="ProviderSupport" element={<ProviderSupport />} />

                    {/* ─── Admin ─── */}
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
                    <Route path="Addjob" element={<AdminAddJob />} /> {/* ✅ Updated yahan */}
                    <Route path="Addjob" element={<InterviewList />} /> 

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