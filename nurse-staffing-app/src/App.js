import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./Loading";
import './App.css';
import './index.css';

const Login = lazy(() => import("./components/login/login"));
const Register = lazy(() => import("./components/register/register"));
const ForgotPass = lazy(() => import("./components/forgot-password/forgot-password"));
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));

function App() {
  const auth = localStorage.getItem('isAuth');

  return (
    <main className="App relative">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={auth ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/forgot-password" element={auth ? <Navigate to="/dashboard" /> : <ForgotPass />} />
          <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
