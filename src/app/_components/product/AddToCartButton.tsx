"use client";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { Product } from "@/types/productTypes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartItem } from "@/redux/slice/cartSlice";
import { toast } from "react-hot-toast";

const AddToCartButton: React.FC<Product> = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}) => {
  const [count, setCount] = React.useState(1);
  const dispatch = useAppDispatch();
  const data: CartItem = {
    productId: id,
    quantity: count,
    image,
    price,
    title,
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center mt-10">
        <button
          onClick={() => {
            if (count === 1) return;
            setCount(count - 1);
          }}
          className=" px-5 py-2 bg-neutral-700 rounded-md text-neutral-100"
        >
          <RiSubtractFill />
        </button>
        <span className="w-12 h-fit block  text-center font-normal text-xl">
          {count}
        </span>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className=" px-5 py-2 bg-neutral-700 rounded-md text-neutral-100"
        >
          <IoAddOutline />
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(addToCart(data));
            toast.success(`${count} items added to cart`);
          }}
          className="w-fit px-10 mt-5  py-3 hover:bg-neutral-800 transition-colors duration-200 ease-linear bg-neutral-700 rounded-md text-neutral-100"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;
