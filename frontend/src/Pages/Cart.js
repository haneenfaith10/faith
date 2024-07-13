import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../Component/CartProduct";
import emptyCartImage from "../assets/CART.png";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/checkout.payment`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productCartItem),
        }
      );
      if (res.statusCode === 500) return;

      const data = await res.json();

      toast("Redirect to payment Gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("You are not Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <>
      <div className="p-3 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-green-300">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="flex gap-4">
            {/* display cart items */}
            <div className="w-full max-w-3xl">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    description={el.description}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart items */}
            <div className="md:w-full max-w-md  ml-auto py-2">
              <h2 className="bg-green-300 text-slate-800 font-semibold p-2  text-lg border border-slate-400">
                Summary
              </h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p className="text-slate-300">Total Qty:</p>
                <p className="ml-auto w-32 font-bold text-slate-300">
                  {totalQty}
                </p>
              </div>
              <div className="flex w-full py-2 text-lg border-">
                <p className="text-slate-300">Total Price:</p>
                <p className="ml-auto w-32 font-bold text-slate-300">
                  <span className="text-green-300">₹</span>
                  {totalPrice}
                </p>
              </div>
              <button
                className="bg-slate-900 w-full text-lg font-bold py-2 text-green-300  cursor-pointer hover:bg-black border border-green-300"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img
                src={emptyCartImage}
                className="w-full max-w-4xl py-24 md:py-6"
              />
              {/* <p className="text-green-300 text-3xl font-bold">Empty Cart</p> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
