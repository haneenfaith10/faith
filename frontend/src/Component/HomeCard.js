import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({
  name,
  image,
  price,
  category,
  description,
  loading,
  id,
}) => {
  return (
    <div
      className="bg-slate-900 p-9 md:p-8 rounded hover:bg-slate-900 cursor-pointer shadow-md overflow-hidden
    "
    >
      {name ? (
        <>
          <Link to={`menu/${id}`}>
            <div className="w-40 md:w-60 min-h-[170px] hover:scale-110 transition-all">
              <img src={image} className="h-full w-full" />
            </div>
            <h3 className="font-semibold text-slate-300 text-center">{name}</h3>
            <p className="text-center text-slate-600 font-medium">
              {description}
            </p>
            <p className="text-center font-bold text-green-300 text-sm">
              <span className="text-green-300">₹</span>
              <span>{price}</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center item-center text-green-300 h-full w-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
