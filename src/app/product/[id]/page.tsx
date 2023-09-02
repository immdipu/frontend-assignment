import React from "react";
import { Product } from "@/types/productTypes";
import { Stars, AddToCartButton } from "@/app/_components";
import Image from "next/image";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async ({ params }: any) => {
  const product: Product = await getProduct(params.id);

  return (
    <div className="w-11/12 mx-auto flex gap-7 max-md:flex-col">
      <div className=" w-96 max-md:w-full max-md:h-[20rem] h-[30rem] overflow-hidden rounded-md whitespace-nowrap flex-shrink-0 ">
        <Image
          src={product.image}
          height={480}
          width={500}
          alt={product.title}
          className="w-full rounded-md h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-3xl max-md:text-xl  font-bold text-neutral-200  w-10/12 ">
          {product.title}
        </h3>
        <div className="mt-3">
          <Stars reviews={product.rating.count} stars={product.rating.rate} />
        </div>
        <div className="mt-5">
          <span className="text-xl font-medium text-neutral-200">
            Rs. {product.price}
          </span>
        </div>
        <div className="w-11/12 max-md:text-sm mt-5 text-neutral-400 pr-10 ">
          <p>{product.description}</p>
        </div>
        <div className="mt-4">
          <span className="text-neutral-200 font-medium">Available:</span>{" "}
          <span className="text-neutral-400 font-light">In Stock</span>
        </div>
        <div className="mt-4">
          <span className="text-neutral-200 font-medium">category:</span>{" "}
          <span className="text-neutral-400 font-light">
            {product.category}
          </span>
        </div>
        <div className="max-md:mb-7">
          <AddToCartButton {...product} />
        </div>
      </div>
    </div>
  );
};

export default page;
