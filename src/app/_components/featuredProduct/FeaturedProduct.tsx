"use client";
import React from "react";
import { ProductsApis } from "@/apis/productApis";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/productTypes";
import { ProductCard, SmallLoader, ProductCardSkeleton } from "..";

const FeaturedProduct = () => {
  const { data, isLoading, isError } = useQuery(["getproducts"], () =>
    ProductsApis.getAllProduct()
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-autoFit gap-10 ">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    );
  }

  console.log(data);
  return (
    <div className="grid grid-cols-autoFit gap-10 max-md:gap-8 max-md:flex max-md:flex-wrap ">
      {data &&
        data?.length > 0 &&
        data.map((item: Product) => {
          return (
            <>
              <ProductCard {...item} />
            </>
          );
        })}
    </div>
  );
};

export default FeaturedProduct;
