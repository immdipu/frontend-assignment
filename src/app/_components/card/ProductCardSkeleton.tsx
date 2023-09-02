import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="w-52 block bg-neutral-950 pb-4 animate-pulse">
      <div className="w-full rounded-md bg-neutral-700 h-60"></div>
      <div className="text-base px-3 leading-6 py-2 bg-neutral-700 w-36 mx-5 my-3 rounded-md h- font-light text-start"></div>
      <div>
        <div className="flex px-3 gap-2 items-end">
          <div className="flex gap-1 items-center bg-neutral-700 w-12 h-6 rounded-lg"></div>
          <div className="text-xs font-extralight mb-1 text-neutral-400"></div>
        </div>
        <div className="px-4 text-neutral-100 mt-2"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
