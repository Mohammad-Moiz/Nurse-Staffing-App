import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import StaffingRequests from './components/pages/StaffingRequests';
import StudentManagement from './components/pages/StudentManagement';
import StaffManagement from './components/pages/StaffManagement';
import StaffCommunication from './components/pages/StaffCommunication';
import Issues from './components/pages/Issues';
import Reports from './components/pages/Reports';
import JobManagement from './components/pages/JobManagement';
import Navbar from './components/Navbar';
import register from './components/register/register';
import login from './components/login/login';
import forgotPass from './components/forgot-password/forgot-password';
import './App.css';
import './index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/staffing-requests" component={StaffingRequests} />
            <Route path="/student-management" component={StudentManagement} />
            <Route path="/staff-management" component={StaffManagement} />
            <Route path="/staff-communication" component={StaffCommunication} />
            <Route path="/issues" component={Issues} />
            <Route path="/reports" component={Reports} />
            <Route path="/job-management" component={JobManagement} />
            <Route path="/register" element={register} />
            <Route path="/login" element={login} />
            <Route path="/forgot-password" element={forgotPass} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
