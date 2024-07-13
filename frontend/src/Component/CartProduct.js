import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseqty,
  decreaseqty,
} from "../redux/productSlice";

const CartProduct = ({
  id,
  name,
  image,
  category,
  description,
  qty,
  total,
  price,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-900 p-4 px-4 mb-3 mt-2 flex rounded border border-green-300 ">
      <div className="p-3 px-4 mt-4 mb-7 md:mb-14 bg-slate-800 rounded overflow-hidden">
        <img src={image} className="h-38 w-32 object-cover" />
      </div>
      <div className="flex flex-col gap-1 py-3 md:py-7 w-full items-cente">
        <div className="flex justify-between">
          <h3 className=" flex p-1 px-7 font-semibold text-slate-200 text-center capitalize text-2xl md:text-2xl">
            {name}
          </h3>
          <div
            className="text-slate-400 cursor-pointer hover:text-slate-300 text-lg"
            onClick={() => dispatch(deleteCartItem(id))}
          >
            <MdDelete />
          </div>
        </div>

        <p className="text-center flex px-16 text-slate-400 font-medium md:text-1xl">
          {description}
        </p>
        <p className=" flex justify-center pr-40 md:mr-52 font-bold text-slate-200 text-1xl md:text-1xl">
          <span className="text-slate-200">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex  justify-center items-center text-white">
            <button
              onClick={() => dispatch(increaseqty(id))}
              className="bg-green-300 px-4 py-1 mx-8 my-3 rounded hover:bg-green-400 cursor-pointer font-medium p-2"
            >
              <TbPlus className="text-black" />
            </button>
            <p className="font-semibold">{qty}</p>
            <button
              onClick={() => dispatch(decreaseqty(id))}
              className="bg-green-300 px-4 py-1 mx-8 my-3 rounded hover:bg-green-400 cursor-pointer font-medium p-2"
            >
              <TbMinus className="text-black" />
            </button>
          </div>
          <div className="flex  items-center text-slate-400 font-semibold">
            <p>Total :</p>
            <p>
              <span className="text-green-300">₹</span>
              {total}
            </p>
          </div>
        </div>
        <div className="flex  justify-center text-slate-400 pr-52 md:pr-80">
          <p className="  text-slate-400 font-medium">Category :</p>
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
