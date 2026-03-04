import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

import NewClaim from './pages/Dashboard/NewClaim';
import MyDrafts from './pages/Dashboard/MyDrafts';
import AdminReview from './pages/Dashboard/AdminReview';

import PublicLayout from './layouts/PublicLayout';

import BlogLayout from './pages/blog/layout';
import BlogIndex from './pages/blog/page';
import BlogPostPage from './pages/blog/[slug]/page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="blog" element={<BlogLayout />}>
            <Route index element={<BlogIndex />} />
            <Route path=":slug" element={<BlogPostPage />} />
          </Route>
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/drafts" replace />} />
            <Route path="drafts" element={<MyDrafts />} />
            <Route path="new-claim" element={<NewClaim />} />
            <Route path="hr-review" element={<AdminReview />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
