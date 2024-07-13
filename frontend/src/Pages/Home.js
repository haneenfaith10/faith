import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../Component/HomeCard";
import CardFeature from "../Component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../Component/FilterProduct";
import Allproduct from "../Component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(45, 49);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-green-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-bold text-slate-800">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-4 text-slate-300">
            We've got your{" "}
            <span className="text-green-300 drop-shadow">delivery</span> needs
            covered.
          </h2>
          <p className="py-3 text-base text-slate-300">
            Welcome to{" "}
            <span className="text-green-300 font-bold">FaithStore</span>, your
            premier choice for fast and reliable delivery services. Whether
            you're craving a hot meal, need groceries,we ensures your items
            reach you quickly and safely. With real-time tracking, multiple
            payment options, and 24/7 availability, we make delivery easy and
            convenient. Experience top-notch service and efficiency with
            <span className="text-green-300 font-bold"> FaithStore</span>– Stay
            With Us With <span className="text-green-300 font-bold">Love</span>
          </p>
          <button className="font-bold bg-green-300 text-slate-800 px-2 py-1 rounded-md hover:bg-green-400 text-sm mt-5 mb-7">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-2 md:gap-10 px-9 md:px-10 py-4 md:py-6 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                    description={el.description}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"loading..."} />
                );
              })}
        </div>
      </div>
      <div className="">
        <h2 className="font-bold text-2xl text-green-300">Fresh Vegetables</h2>
        <div className="flex w-full items-center">
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-green-300 hover:bg-green-400 text-lg py-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-green-300 hover:bg-green-400 text-lg py-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                    description={el.description}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="loading..." key={index + "cartloading"} />
              ))}
        </div>
      </div>

      <Allproduct heading={"Find Out Now"} />
    </div>
  );
};

export default Home;
