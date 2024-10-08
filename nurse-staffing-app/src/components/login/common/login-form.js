import React, { useEffect, useState } from "react";
import Textinput from "../../ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const navigate = useNavigate(); 

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [bacendDirect, setBackendDirect] = useState('');
  const [reDirectTrue, setReDirectTrue] = useState(false);

  console.log(reDirectTrue, "reDirectTrue")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const userData = urlParams.get('userData');

    if (success === 'false') {
      window.localStorage.removeItem("isAuth");
      setReDirectTrue(false);
    } else if (success === 'true' && userData) {
      setReDirectTrue(true);
      const parsedUserData = JSON.parse(userData);
      setBackendDirect(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    if (bacendDirect?.email && bacendDirect?.password && success === 'true') {
      window.localStorage.setItem("isAuth", JSON.stringify(bacendDirect));
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 1000);
    }
  }, [bacendDirect, navigate]);

  const onSubmit = async (data) => {
    let result = await fetch(import.meta.env.VITE_SOME_KEY + '/users/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: data.email, password: data.password })
    });

    result = await result.json();

    if (result?.result === "user nhi mila") {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      window.localStorage.setItem("isAuth", JSON.stringify(result));
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const isAuth = localStorage.getItem('isAuth');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    if (success && success === 'false') {
      localStorage.removeItem('isAuth');
    } else {
      if (isAuth) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    }
  }, [isAuth, navigate]);

  return (
    <form className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder={'Enter your email'}
      />
      <Textinput
        name="password"
        label="password"
        type="password"
        placeholder={'Enter your password'}
        register={register}
        error={errors.password}
        hasicon
      />
      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center" onClick={handleSubmit(onSubmit)}>Sign in</button>
    </form>
  );
};

export default LoginForm;
