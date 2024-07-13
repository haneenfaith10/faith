import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const userData = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        navigate("/");
      }

    } else {
      alert("Plaese Enter required fields");
    }
  };
  return (
    <div className="p-3 md:p-4 mt-20 md:mt-20">
      <div className="w-full max-w-sm bg-slate-900 m-auto flex  flex-col p-6 rounded  ">
        {/* <h1 className='text-center text-2xl font-bold text-slate-800'>Sign up</h1> */}
        <div className="w-20 overflow-hid rounded-full drop-shadow-md shadow-md ">
          {/* <img src={loginSignupImage} className="w-full" /> */}
          <h2 className="text-green-300 text-2xl font-bold px-25">
            FaithStore.
          </h2>
        </div>

        <form
          className="w-full py-4 flex flex-col text-slate-300 mt-7"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-200"
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

          <button className="w-full max-w-[150px] m-auto  bg-green-300 hover:bg-green-400 cursor-pointer text-slate-900 text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-xs mt-1 text-slate-100">
          Don't have an account ?{" "}
          <Link to={"/signup"} className="text-green-300 font-semibold ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
