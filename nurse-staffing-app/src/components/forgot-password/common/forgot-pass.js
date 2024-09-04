import React, { useState } from "react";
import Textinput from "../../ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import validator from 'validator'

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const ForgotPass = () => {
  const [userData, setUserData] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const [emailValidation, setEmailValidation] = useState('')
  const [uploadingData, setUploadingData] = useState(false)
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = async () => {
    if (!userData?.email) {
      setEmailValidation("Email is required")
    } else if (!validator.isEmail(userData.email)) {
      setEmailValidation("Email is invalid")
    } else {
      setEmailValidation("")
      // console.log(userData)
      try {
        setUploadingData(true)
        // console.log('try me araha hai?')
        let result = await axios.post(import.meta.env.VITE_SOME_KEY + '/users/forgetpassword', { email: userData?.email })
        if (result?.data?.message === "Verified krwa le") {
          // console.log('if me araha hai?')
          toast.success(`Email Send success fully`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setMessage("Email Send success fully please check your mail")
          setMessageError("")
          setUploadingData(false)
        } else if (result?.data?.message === "user nhi mila") {
          toast.error("Invalid email", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setMessage('')
          setMessageError("Invalid email")
          setUploadingData(false)
        }
        // console.log(result)
        // console.log(result?.data?.message)
      } catch (error) {
        console.log('catch me araha hai?')
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setMessage('')
        setMessageError("Something went wrong try later")
        setUploadingData(false)
      }

    }
  }

  return (
    <form className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder={"Enter your email"}
        value={userData["email"] || ""}
        onChange={handleChange}

      />
      <div className={` mt-2 text-danger-500 block text-sm`} >
        {emailValidation}
      </div>
      <div className="relative">
        <div className="ltr:text-right rtl:text-left">
          <div className={`${uploadingData === true ? 'opacity-[0.7]' : ''}`}>
            <button type="button" onClick={handleClick} className="btn btn-dark block w-full text-center">
              Send recovery email
            </button>
          </div>
        </div>
        {
          uploadingData === true ?
            <div className=' absolute top-[0] w-[100%] black-bg flex justify-center h-[47px] button-style items-center'>
              <div className='loader-spiner'></div>
            </div> : null
        }
      </div>
      <div className={` mt-2 text-black-500 block text-[18px]`} >
        {message}
      </div>
      <div className={` mt-2 text-danger-500 block text-[18px]`} >
        {messageError}
      </div>
    </form>
  );
};

export default ForgotPass;