import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);
  return (
    <Link href={"/cart"} className="flex items-center justify-center relative">
      <BiCartAlt className="text-3xl text-neutral-300 mt-1" />
      {cart.items.length > 0 && (
        <span className="bg-neutral-100 -right-3 text-xs absolute -top-2 px-3 py-[1px] rounded-md text-neutral-900">
          {cart.items
            .map((item) => item.quantity)
            .reduce((total, number) => total + number, 0)}
        </span>
      )}
    </Link>
  );
};

export default Cart;
