import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px;
`;

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/pages/staffing-requests">Staffing Requests</Link>
      <Link to="/pages/student-management">Student Management</Link>
      <Link to="/pages/staff-management">Staff Management</Link>
      <Link to="/pages/staff-communication">Staff Communication</Link>
      <Link to="/pages/issues">Issues</Link>
      <Link to="/pages/reports">Reports</Link>
      <Link to="/pages/job-management">Job Management</Link>
      <Link to="/login/login">Login</Link>
      <Link to="/register/register">Register</Link>
      <Link to="/forgot-password/forgot-password">Forget Password</Link>
    </Nav>
  );
};

export default Navbar;
