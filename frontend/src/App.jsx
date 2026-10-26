// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Components
// import Sidebar from "./Components/Sidebar";
// import Topbar from "./Components/topbar";
// import DashboardPage from "./Components/dashboardpage";

// // ─── Landing Pages ───
// import Contact from "./landing/Contect"; 
// import Testimonial from "./landing/Testimonials";
// import Jobs from "./landing/Jobs";

// // Temporary Placeholders
// const About = () => (
//   <div className="p-10 text-center text-xl font-bold">
//     About Page (Under Construction)
//   </div>
// );
// const Services = () => (
//   <div className="p-10 text-center text-xl font-bold">
//     Services Page (Under Construction)
//   </div>
// );
// const Applications = () => (
//   <div className="p-10 text-center text-xl font-bold">
//     Applications Page (Under Construction)
//   </div>
// );
// const Login = () => (
//   <div className="p-10 text-center text-xl font-bold">
//     Login Page (Under Construction)
//   </div>
// );

// // Seekers
// import Resume from "./Seekers/Resume";
// import Application from "./seekers/application";
// import Interviews from "./seekers/Interviews";
// import MyApplications from "./seekers/MyApplications";
// import MyProfile from "./seekers/MyProfile";
// import SDashboard from "./seekers/SDashboard";
// import BrowseJobs from "./seekers/BrowseJobs";
// import SavedJobs from "./seekers/SavedJobs";
// import Reviewss from "./Seekers/Reviews";
// import SeekerSupport from "./Seekers/SeekerSupport";

// // Providers
// import CompanyProfile from "./providers/CompanyProfile";
// import AddCompany from "./providers/AddCompany";
// import Addjob from "./providers/Addjob";
// import Myjob from "./providers/Myjob";
// import Applicants from "./providers/Applicants";
// import ProviderSupport from "./providers/ProviderSupport";

// // Admin
// import AllJobs from "./admin/AllJobs";
// import Approvals from "./admin/Approvals";
// import ManageUsers from "./admin/ManageUsers";
// import Categories from "./admin/Categories";
// import Locations from "./admin/Locations";
// import Support from "./admin/Support";
// import AdminReview from "./admin/adminReview";

// function App() {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ═══════════════════════════════════════════
//             PUBLIC LANDING PAGES (No Sidebar)
//            ═══════════════════════════════════════════ */}
//         {/* ✅ Sabse pehle Contact page run hoga */}
//         <Route path="/" element={<Contact />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/testimonials" element={<Testimonial />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/jobs" element={<Jobs />} />
//         <Route path="/applications" element={<Applications />} />
//         <Route path="/login" element={<Login />} />

//         {/* ═══════════════════════════════════════════
//             DASHBOARD ROUTES (With Sidebar + Topbar)
//            ═══════════════════════════════════════════ */}
//         <Route
//           path="/dashboard/*"
//           element={
//             <div className="min-h-screen bg-slate-50">
//               <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//               <div
//                 className={`transition-all duration-300 ${
//                   isOpen ? "ml-64" : "ml-20"
//                 }`}
//               >
//                 <Topbar toggleSidebar={toggleSidebar} />

//                 <main className="p-4 md:p-6">
//                   <Routes>
//                     <Route index element={<DashboardPage />} />

//                     {/* ─── Job Seeker ─── */}
//                     <Route path="sdashboard" element={<SDashboard />} />
//                     <Route path="myprofile" element={<MyProfile />} />
//                     <Route path="resume" element={<Resume />} />
//                     <Route path="browsejobs" element={<BrowseJobs />} />
//                     <Route path="saved-jobs" element={<SavedJobs />} />
//                     <Route path="applications" element={<Application />} />
//                     <Route path="myapplications" element={<MyApplications />} />
//                     <Route path="interviews" element={<Interviews />} />
//                     <Route path="reviews" element={<Reviewss />} />
//                     <Route path="SeekerSupport" element={<SeekerSupport />} />

//                     {/* ─── Job Provider ─── */}
//                     <Route path="company" element={<CompanyProfile />} />
//                     <Route path="add-company" element={<AddCompany />} />
//                     <Route path="post-job" element={<Addjob />} />
//                     <Route path="my-jobs" element={<Myjob />} />
//                     <Route path="applicants" element={<Applicants />} />
//                     <Route path="ProviderSupport" element={<ProviderSupport />} />

//                     {/* ─── Admin ─── */}
//                     <Route path="users" element={<ManageUsers />} />
//                     <Route path="approvals" element={<Approvals />} />
//                     <Route path="all-jobs" element={<AllJobs />} />
//                     <Route path="categories" element={<Categories />} />
//                     <Route path="locations" element={<Locations />} />
//                     <Route path="support" element={<Support />} />
//                     <Route path="admin-review" element={<AdminReview />} />

//                     {/* Fallback */}
//                     <Route path="*" element={<Navigate to="/dashboard" replace />} />
//                   </Routes>
//                 </main>
//               </div>
//             </div>
//           }
//         />

//         {/* Global Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// ─── Components ───
import Sidebar from "./Components/Sidebar";
import Topbar from "./components/topbar";
import DashboardPage from "./components/dashboardpage";


// ─── Landing Pages ───
import Navbar from "./landing/Navbar";
import Footer from "./landing/Footer";
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
import BrowseJobs from "./seekers/BrowseJobs";
import SavedJobs from "./seekers/SavedJobs";
import Reviewss from "./seekers/Reviews";
import SeekerSupport from "./seekers/SeekerSupport";

// ─── Providers ───
import CompanyProfile from "./providers/CompanyProfile";
import AddCompany from "./providers/AddCompany";
import Addjob from "./providers/Addjob";
import Myjob from "./providers/Myjob";
import Applicants from "./providers/Applicants";
import ProviderSupport from "./providers/ProviderSupport";

// ─── Admin ───
import AllJobs from "./admin/AllJobs";
import Approvals from "./admin/Approvals";
import ManageUsers from "./admin/ManageUsers";
import Categories from "./admin/Categories";
import Locations from "./admin/Locations";
import Support from "./admin/Support";
import Reports from "./admin/Reports";
import AdminReview from "./admin/adminReview";
import Staff from "./admin/Staff";
import AddStaff from "./admin/Addstaff";

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
        {/* ═══════════════════════════════════════════
            PUBLIC LANDING PAGES (With Navbar & Footer)
           ═══════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════
            DASHBOARD ROUTES (With Sidebar & Topbar)
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
                    <Route path="reports" element={<Reports />} />
                    <Route path="admin-review" element={<AdminReview />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="add-staff" element={<AddStaff />} />
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