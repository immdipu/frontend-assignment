"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const CartTable = () => {
  const cartItems = useAppSelector((state) => state.cart);

  const Subtotal = cartItems.items.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const total = Subtotal + 200;

  return (
    <div>
      <table className="w-full bg-neutral-800 table-fixed  text-white">
        <thead>
          <tr>
            <th className="w-1/2  px-4 py-2">Item</th>
            <th className="w-1/4  px-4 py-2">Price</th>
            <th className="w-1/4  px-4 py-2">Quantity</th>
            <th className="w-1/4  px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.items.map((item, index) => (
            <tr
              key={index}
              className="border-t border-opacity-25  border-neutral-200"
            >
              <td className="px-4 max-md:px-0 max-md:w-full py-2">
                <div className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt=""
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <span className="block font-normal text-lg w-11/12">
                    {item.title}
                  </span>
                </div>
              </td>
              <td className="px-4 text-center text-neutral-200 py-2">
                Rs. {item.price}
              </td>
              <td className="px-4 text-center py-2">{item.quantity}</td>
              <td className="px-4 text-center py-2">
                Rs. {item.quantity * item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {cartItems.items.length > 0 && (
        <>
          <div className="flex flex-col w-full mt-10  items-end">
            <div className="bg-neutral-700 px-5 py-4 rounded-md">
              <div className="  flex-grow justify-between  items-stretch  flex  gap-3 ">
                <h3 className="font-medium">SubTotal: </h3>
                <h3 className="text-neutral-300">
                  Rs.
                  {Subtotal}
                </h3>
              </div>
              <div className=" flex-grow  mt-3 flex gap-3 items-center">
                <h3 className="font-medium">Shipping fee: </h3>
                <h3 className="text-neutral-300">Rs. 200</h3>
              </div>
              <div className=" flex-grow  mt-3 justify-between flex gap-3 items-center">
                <h3 className="font-medium text-xl"> Total: </h3>
                <h3 className="text-neutral-300">Rs. {total.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-end   ">
            <div className="w-fit flex flex-col">
              <button className="border  bg-neutral-500">Checkout</button>
              <button className="border bg-neutral-500">Clear cart</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartTable;
