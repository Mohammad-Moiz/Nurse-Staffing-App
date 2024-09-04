import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./Loading";
import { useRoleQuery } from "./roleApi";

const Login = lazy(() => import("./components/login/login"));
const Register = lazy(() => import("./components/register/register"));
const ForgotPass = lazy(() => import("./components/forgot-password/forgot-password"));

function App() {
  const auth = localStorage.getItem('isAuth');
  const userData = JSON.parse(auth);
  const { data, isSuccess } = useRoleQuery(userData?.roleid);

  // Effect that uses both data and isSuccess
  useEffect(() => {
    if (data && isSuccess) {
      // Do something with data
    }
  }, [data, isSuccess]);

  return (
    <main className="App relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
