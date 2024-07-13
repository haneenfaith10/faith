import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-1 md:px-4 z-50 bg-slate-900 border border-slate-700">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            {/* <img src={logo} className="h-full" /> */}
            <h2 className="text-green-300 font-bold text-lg py-2 px-4">
              FaithStore.
            </h2>
          </div>
        </Link>

        <div className="flex items-center gap-7 md:gap-7">
          <nav className="gap-4 md:gap-6 text-sm md:text-md px-4 md:px-4 text-slate-300 hidden md:flex">
            <Link to={""} className=" md:px-2 hover:text-white ">
              Home
            </Link>
            <Link
              to={"menu/664b725c8b7ae46e490f868c"}
              className="md:px-2 hover:text-white"
            >
              Menu
            </Link>
            <Link to={"about"} className="md:px-2 hover:text-white">
              About
            </Link>
            <Link to={"contact"} className="md:px-2 hover:text-white">
              Contact
            </Link>
          </nav>
          <div className="text-3xl text-slate-300 relative cursor-pointer">
            <Link to={"cart"}>
              <GiShoppingCart />
              <div
                className="absolute -top-1 -right-1 text-slate-900 bg-green-300 h-4 w-4 rounded-full m-0 p-0 text-sm text-center text-black font-bold
            "
              >
                {cartItemNumber.length}
              </div>
            </Link>
          </div>

          <div className="text-slate-300" onClick={handleShowMenu}>
            <div className="text-2xl cursor-pointer w-10  rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-1 md:right-3 pt-3 bg-slate-900 py-2  px-2 px-2shadow drop-shadow-md flex flex-col min-w-[100px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 f px-5 py-1"
                  >
                    New product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 px-5 py-1"
                    onClick={handleLogout}
                  >
                    Logout-{userData.firstName}{" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 font-medium px-5 py-1"
                  >
                    Login
                  </Link>
                )}
                <nav className=" text-sm md:text-md px-4 md:px-3 text-slate-300 flex flex-col px-3 md:hidden">
                  <Link
                    to={""}
                    className="px-2 py-1 whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 "
                  >
                    Home
                  </Link>
                  <Link
                    to={"menu/664b725c8b7ae46e490f868c"}
                    className="px-2 py-1 whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 "
                  >
                    Menu
                  </Link>
                  <Link
                    to={"about"}
                    className="px-2 py-1 whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 "
                  >
                    About
                  </Link>
                  <Link
                    to={"contact"}
                    className="px-2 py-1 whitespace-nowrap cursor-pointer text-slate-100 hover:text-green-300 "
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
