import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { CartTable } from "../_components";

const page = () => {
  return (
    <div className="w-11/12 mx-auto">
      <CartTable />
    </div>
  );
};

export default page;
