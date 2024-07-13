import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, increaseqty } from "../redux/productSlice";
const CardFeature = ({
  image,
  name,
  price,
  category,
  description,
  loading,
  id,
}) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
        description: description,
      })
    );
  };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-slate-900 hover:shadow-lg drop-shadow py-5 px-4 cursor-pointer">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-300 text-center mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-center text-slate-600 font-medium">{category}</p>
            <p className="text-center font-bold text-green-300 text-sm">
              <span className="text-green-300">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-green-300 px-4 py-1 mx-8 my-3 rounded hover:bg-green-400 cursor-pointer font-medium "
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items center text-green-300 py-16">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
