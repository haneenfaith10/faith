import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../Utility/ImageToBase64";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImageToBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmpassword } = data;
    if (firstName && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();

        // alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("/login");
        }
      } else {
        alert("password and conform password is not equal");
      }
    } else {
      alert("Plaese Enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-slate-900 m-auto flex  flex-col p-6 rounded cursor-pointer ">
        {/* <h1 className='text-center text-2xl font-bold text-slate-800'>Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full h-full "
          />

          <label htmlFor="profilegImage">
            <div className="absolute bottom-0 h-4/5 bg-slate-00 w-full text-center cursor-pointer">
              <p className="text-sm py-"></p>
            </div>
            <input
              type={"file"}
              id="profilegImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-4 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="text-slate-300">
            First Name
          </label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded focus-within:outline-blue-200 "
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="LastName" className="text-slate-300">
            Last Name
          </label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded focus-within:outline-blue-200"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email" className="text-slate-300">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded focus-within:outline-blue-200"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password" className="text-slate-300">
            Password
          </label>
          <div className="flex px-2 py-1 bg-slate-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-slate-200">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-100  border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer text-slate-700"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword" className="text-slate-300">
            Confirm Password
          </label>
          <div className="flex px-2 py-1 bg-slate-100 rounded mt-1 mb-2 focus-within:outline focus-within:outline-slate-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              className="w-full bg-slate-100  border-none outline-none"
              value={data.confirmpassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer text-slate-700"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-green-300 hover:bg-green-400 cursor-pointer text-slate-900 text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>
        <p className="text-left text-xs mt-1 text-slate-100">
          Have an account ?{" "}
          <Link to={"/login"} className="text-green-300 font-semibold ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
