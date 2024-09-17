import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./Loading";
import './App.css';
import './index.css';

const Login = lazy(() => import("./components/login/login"));
const Register = lazy(() => import("./components/register/register"));
const ForgotPass = lazy(() => import("./components/forgot-password/forgot-password"));
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));
const Alerts = lazy(() => import("./components/pages/Alerts"));
const Chats = lazy(() => import("./components/pages/Chats"));
const Users = lazy(() => import("./components/pages/Users"));
const StaffingRequests = lazy(() => import("./components/pages/StaffingRequests"));
const StudentManagement = lazy(() => import("./components/pages/StudentManagement"));
const StaffManagement = lazy(() => import("./components/pages/StaffManagement"));
const JobManagement = lazy(() => import("./components/pages/JobManagement"));
const Issues = lazy(() => import("./components/pages/Issues"));
const Reports = lazy(() => import("./components/pages/Reports"));


function App() {
  const auth = localStorage.getItem('isAuth') === 'true';

  return (
    <div className="App">
      <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={auth ? <Navigate to="/login" /> : <Login />} />
            <Route path="/register" element={auth ? <Navigate to="/register" /> : <Register />} />
            <Route path="/forgot-password" element={auth ? <Navigate to="/forgot-password" /> : <ForgotPass />} />
            <Route path="/dashboard" element={auth ? <Navigate to="/dashboard" /> : <Dashboard/>} />

            {/* Pages routes */}
            <Route path="/pages/alerts" element={auth ? <Alerts /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/chats" element={auth ? <Chats /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/users" element={auth ? <Users /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/staffing-requests" element={auth ? <StaffingRequests /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/student-management" element={auth ? <StudentManagement /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/staff-management" element={auth ? <StaffManagement /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/job-management" element={auth ? <JobManagement /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/issues" element={auth ? <Issues /> : <Navigate to="/dashboard" />} />
            <Route path="/pages/reports" element={auth ? <Reports /> : <Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
