import React from "react";
// import { useSelector } from 'react-redux/';
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "./../utils/cartSlice";
import { formatIndianRupees } from "../utils/helper";
import Navbar from "./Navbar";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.item);
  console.log(cartItems, "dsf");

  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <>
    <Navbar/>
      <div className="container flex flex-col justify-between m-2 w-[100%] h-[100%] ">
        {cartItems.map((item) => (
          <div className="flex justify-center p-3">
            <div className=" p-3 h-96 w-96 ">
              <img
                src={item.image}
                alt="data"
                className="w-96 h-96 p-2 border-yellow-200 border-8"
              />
            </div>
            <div className="w-1/2 p-2">
              <p className="font-bold">{item.title}</p>
              <p>{item.description}</p>
              <p className="font-semibold mt-2 mb-3">{item.category}</p>
              {/* <p className='mb-2'>{generateStarIcons(item.rating.rate)}{item.rating.rate}</p> */}
              <p className="mb-5">Price: {formatIndianRupees(item.price)}</p>

              <button
                className=" hover:bg-gray-800 bg-black text-white w-[200px] p-3 m-2 rounded-2xl"
                onClick={(id) => handleRemoveItem(item.id)}
              >
                {" "}
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
