import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick}>
      <div
        className={`text-3xl text-green-300 p-5  hover:bg-green-300 hover:text-slate-900 rounded-full cursor-pointer ${
          isActive ? "bg-green-300 text-slate-900" : "bg-slate-900"
        }`}
      >
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize text-green-300">
        {category}
      </p>
    </div>
  );
};

export default FilterProduct;
