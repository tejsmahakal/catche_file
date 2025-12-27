// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Scroll Component
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// Auth Context
import { AuthProvider } from "./context/AuthContext"; // Add this import

// Pages
import Home from "./pages/Home";
import SearchProfiles from "./pages/SearchProfiles";
import Brides from "./pages/Brides";
import Grooms from "./pages/Grooms";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPasswordPage from "./pages/ForgotPassword";
import OtpVerificationPage from "./pages/OtpVerification";
import ResetPasswordPage from "./pages/ResetPassword";
import SuccessStories from "./components/SuccessStories/SuccessStoriesMain";
import ProfileCreation from "./components/CreateProfile/ProfileCreation";
import Contact from "./components/Contact/ContactSection";
import MembershipPlans from "./components/MembershipPlan/MembershipPlans";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import ViewProfilePage from "./pages/ViewProfilePage";
import GroomProfileCard from "./components/Brides/GroomProfileCard";
import ProfileCardUser from "./components/ProfileCardUser/ProfileCardUser";
import MatchesInPune from "./pages/MatchesInPune";
import RequestSent from "./components/RequestSent/RequestSent";
import RequestsPage from "./pages/RequestsPage";
import BiodataTemplate, { emptyBiodata } from "./pages/ProfileCreation/emptyBiodata";
import SuccessModal from "./pages/ProfileCreation/SuccessModal";
import LogoutPanel from "./components/LogoutPanel/LogoutPanel";

import OthersEmptyBiodata from "./pages/ProfileCreation/OthersEmptyBiodata";
import OthersEmptyBiodataPage from "./pages/ProfileCreation/OthersEmptyBiodataPage";
import PublicBiodata from "./pages/ProfileCreation/PublicBiodata";
import PublicBiodataPage from "./pages/ProfileCreation/PublicBiodataPage";
import MyProfilePage from "./pages/ProfileCreation/MyProfilePage";




function App() {
  return (
    // Wrap entire app with AuthProvider
    <AuthProvider>
      <>
        {/* Add ScrollToTop once here */}
        <ScrollToTop />

        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search-profiles" element={<SearchProfiles />} />
            <Route path="/brides" element={<Brides />} />
            <Route path="/grooms" element={<Grooms />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/plans" element={<MembershipPlans />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-profile" element={<ProfileCreation />} />
            <Route path="/viewprofile" element={<ViewProfile />} />
            <Route path="/ViewProfilePage" element={<ViewProfilePage />} />
            <Route path="/MatchesInPune" element={<MatchesInPune />} />
            <Route path="/RequestSent" element={<RequestSent />} />
            <Route path="/RequestsPage" element={<RequestsPage />} />
            <Route path="/emptyBiodata" element={<BiodataTemplate data={emptyBiodata} />} />
            <Route path="/SuccessModal" element={<SuccessModal />} />
             <Route path="/LogoutPanel" element={<LogoutPanel />} />
            <Route path="/OthersEmptyBiodataPage" element={<OthersEmptyBiodataPage />} />
            <Route path="/PublicBiodataPage" element={<PublicBiodataPage />} />
            <Route path="/my-profile" element={<MyProfilePage />} />


          </Route>

          {/* Auth separate */}
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/otp" element={<OtpVerificationPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;