import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column; /* Vertical navigation */
  height: 100vh; /* Full height */
  width: 250px; /* Width of the sidebar */
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 10px 0;
  
  &:hover {
    color: #1e90ff;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/pages/alerts">Alerts</StyledLink>
      <StyledLink to="/pages/chats">Chats</StyledLink>
      <StyledLink to="/pages/users">Users</StyledLink>
      <StyledLink to="/pages/staffing-requests">Staffing Requests</StyledLink>
      <StyledLink to="/pages/student-management">Student Management</StyledLink>
      <StyledLink to="/pages/staff-management">Staff Management</StyledLink>
      <StyledLink to="/pages/job-management">Job Management</StyledLink>
      <StyledLink to="/pages/staff-communication">Staff Communication</StyledLink>
      <StyledLink to="/pages/issues">Issues</StyledLink>
      <StyledLink to="/pages/reports">Reports</StyledLink>
      <StyledLink to="/login/login">Login</StyledLink>
      <StyledLink to="/register/register">Register</StyledLink>
      <StyledLink to="/forgot-password/forgot-password">Forget Password</StyledLink>
    </Nav>
  );
};

export default Navbar;
