import React from "react";
import successImage from "../assets/paym.png";

const Success = () => {
  return (
    // <div className='bg-green-300 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-2xl'>
    //  <p>Payment is Successfully</p>
    // </div>

    <div className="flex w-full justify-center items-center flex-col">
      <img src={successImage} className="w-full max-w-4xl py-24 md:py-6" />
    </div>
  );
};

export default Success;
