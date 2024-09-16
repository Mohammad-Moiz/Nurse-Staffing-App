import React, { useState } from "react";
import Textinput from "../../ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

const ForgotPass = () => {
  const [userData, setUserData] = useState({});  // Initialize as empty object
  const [uploadingData, setUploadingData] = useState(false);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const {
    register,
    handleSubmit,  // Add handleSubmit to validate onClick
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = async () => {
    setMessage('');
    setMessageError('');

    if (!errors.email) {
      try {
        setUploadingData(true);
        const result = await axios.post(`${process.env.VITE_SOME_KEY}/users/forgetpassword`, { email: userData?.email });

        if (result?.data?.message === "Verified krwa le") {
          toast.success("Email sent successfully");
          setMessage("Email sent successfully. Please check your mail.");
        } else if (result?.data?.message === "user nhi mila") {
          toast.error("Invalid email");
          setMessageError("Invalid email");
        }

      } catch (error) {
        toast.error("Something went wrong");
        setMessageError("Something went wrong. Please try again later.");
      } finally {
        setUploadingData(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="space-y-4 " onSubmit={handleSubmit(handleClick)}>
      <Textinput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="Enter your email"
        value={userData.email || ""}
        onChange={handleChange}
      />
      <div className={`mt-2 text-danger-500 block text-sm`}>
        {errors.email?.message}
      </div>
      <div className="relative">
        <div className={`${uploadingData ? 'opacity-70' : ''}`}>
          <button type="submit" className="btn btn-dark block w-full text-center">
            {uploadingData ? "Sending..." : "Send recovery email"}
          </button>
        </div>
      </div>
      <div className="mt-2 text-black-500 block text-[18px]">
        {message}
      </div>
      <div className="mt-2 text-danger-500 block text-[18px]">
        {messageError}
      </div>
    </form>
  );
};

export default ForgotPass;
