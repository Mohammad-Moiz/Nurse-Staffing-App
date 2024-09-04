import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./common/login-form";
import useDarkMode from "../hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

import LogoWhite from "..//assets/images/svg/nurse-staffing.jpg";
import Logo from "..//assets/images/svg/nurse-staffing.jpg";
import Illustration from "..//assets/images/auth/nurse-logo.png";


const Login = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <Link to="/">
                <img src={isDark ? LogoWhite : Logo} alt="" className="mb-10 w-[220px]" />
              </Link>
              {/* <h4>
                Unlock your Project
                <span className="text-slate-800 dark:text-slate-400 font-bold">
                  performance
                </span>
              </h4> */}
            </div>
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              <img
                src={Illustration}
                alt="Illustration"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      className="mx-auto w-[170px]"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-slate-500 text-base">
                    Sign in to your account 
                  </div>
                </div>
                <LoginForm />
                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-6 uppercase text-sm">
                  Don’t have an account?{" "}
                  <Link
                    to="#"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
              <div className="auth-footer text-center">
                All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;