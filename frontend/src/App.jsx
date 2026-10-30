import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// ─── Layouts ───
import Sidebar from "./layouts/Sidebar";
import Topbar from "./layouts/topbar";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

// ─── Landing Pages ───
import Home from "./landing/Home";
import Jobs from "./landing/Jobs";
import Services from "./landing/Services";
import About from "./landing/About";
import Testimonials from "./landing/Testimonials";
import Contact from "./landing/Contect";
import Login from "./landing/Login";

// ─── Seekers ───
import RegisterSeeker from "./seekers/RegisterSeeker";
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
import ContactMsg from "./admin/ContactMsg";
import Staff from "./admin/Staff";
import Reports from "./admin/Reports";
import AddStaff from "./admin/Addstaff";
import AdminAddJob from "./admin/Addjob";
import InterviewList from "./admin/InterviewList";

// ─── Accounts / Finance ───
import AccountsDashboard from "./account/AccountsDashboard";
import Agreements from "./account/Agreements";
import Invoices from "./account/Invoices";
import Payments from "./Account/Payments";
import Expenses from "./account/Expenses";
import OutstandingPayments from "./account/OutstandingPayments";

// 🌐 PUBLIC LAYOUT (Navbar + Footer)
const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-white">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Login drawer ko /login page pe open rakhne ke liye
const LoginPage = () => (
  <Login isOpen={true} onClose={() => window.history.back()} onLoginSuccess={() => {}} />
);

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <Routes>
        {/* ══════ PUBLIC + SEEKER + PROVIDER (Navbar + Footer) ══════ */}
        <Route element={<PublicLayout />}>
          {/* Landing */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* ✅ Registration — yahi missing tha */}
          <Route path="/register-seeker" element={<RegisterSeeker />} />
          <Route path="/add-company" element={<AddCompany />} />

          {/* Seeker */}
          <Route path="/sdashboard" element={<SDashboard />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/myapplications" element={<MyApplications />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/reviews" element={<Reviewss />} />
          <Route path="/SeekerSupport" element={<SeekerSupport />} />

          {/* Provider */}
          <Route path="/company" element={<CompanyProfile />} />
          <Route path="/post-job" element={<ProviderAddJob />} />
          <Route path="/my-jobs" element={<Myjob />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/ProviderSupport" element={<ProviderSupport />} />
        </Route>

        {/* Login full-screen drawer */}
        <Route path="/login" element={<LoginPage />} />

        {/* ══════ ADMIN / STAFF DASHBOARD (Sidebar + Topbar) ══════ */}
        <Route
          path="/dashboard/*"
          element={
            <div className="min-h-screen bg-slate-50">
              <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              <div className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
                <Topbar toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-6">
                  <Routes>
                    <Route index element={<DashboardPage />} />

                    {/* Admin */}
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
                    <Route path="AddJob" element={<AdminAddJob />} />
                    <Route path="interviews" element={<InterviewList />} />

                    {/* Accounts */}
                    <Route path="accounts" element={<AccountsDashboard />} />
                    <Route path="accounts/agreements" element={<Agreements />} />
                    <Route path="accounts/invoices" element={<Invoices />} />
                    <Route path="accounts/payments" element={<Payments />} />
                    <Route path="accounts/expenses" element={<Expenses />} />
                    <Route path="accounts/outstanding" element={<OutstandingPayments />} />

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