"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { ProductsApis } from "@/apis/productApis";
import { Product } from "@/types/productTypes";

import { ProductCard, ProductCardSkeleton } from "..";

const Search = () => {
  const [gridView, setGridView] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("price-lowest");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const { data, isLoading, isError } = useQuery(
    ["getproductsbyCategories", selectedCategory],
    () => {
      if (selectedCategory !== "") {
        return ProductsApis.getProductByCategories(selectedCategory);
      }
      return ProductsApis.getAllProduct();
    },
    {
      onSuccess: (data) => {},
    }
  );

  const updateSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    let tempProducts = [];
    if (filteredProducts.length > 0) {
      tempProducts = [...filteredProducts];
    } else {
      tempProducts = [...data!];
    }
    if (sort === "price-lowest") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "price-highest") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "name-a") {
      tempProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "name-z") {
      tempProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredProducts(tempProducts);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredProducts = data?.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredProducts) setFilteredProducts(filteredProducts);
  };

  const handlePriceRangeFilter = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    const filteredProducts = data?.filter(
      (product) => product.price >= min && product.price <= max
    );
    if (filteredProducts) setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    if (data && data?.length > 0)
      updateSort({ target: { value: sort } } as any);
  }, []);

  return (
    <div>
      <h3 className=" text-center font-medium text-xl">Explore Products</h3>

      <section className="mt-7 flex">
        <div className="sticky h-fit  top-0">
          <br />
          <br />
          <br />
          <input
            type="text"
            className="outline-none w-60 bg-neutral-700 mt-2 py-2 rounded-t-md  px-3 "
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="bg-neutral-800 w-60 h-fit pb-7   py-3 rounded-b-md ">
            <h3 className="uppercase px-3 font-medium ">Categories</h3>
            <ul className="flex px-3 flex-col gap-2 mt-3">
              <li
                onClick={() => setSelectedCategory("electronics")}
                className={clsx(
                  "capitalize  text-base cursor-pointer font-light",
                  selectedCategory === "electronics"
                    ? "text-blue-500 font-medium"
                    : "text-neutral-300"
                )}
              >
                electronics
              </li>
              <li
                onClick={() => setSelectedCategory("jewelery")}
                className={clsx(
                  "capitalize  text-base cursor-pointer font-light",
                  selectedCategory === "jewelery"
                    ? "text-blue-500 font-medium"
                    : "text-neutral-300"
                )}
              >
                jewelery
              </li>
              <li
                onClick={() => setSelectedCategory("men's clothing")}
                className={clsx(
                  "capitalize  text-base cursor-pointer font-light",
                  selectedCategory === "men's clothing"
                    ? "text-blue-500 font-medium"
                    : "text-neutral-300"
                )}
              >
                men's clothing
              </li>
              <li
                onClick={() => setSelectedCategory("women's clothing")}
                className={clsx(
                  "capitalize text-base cursor-pointer font-light",
                  selectedCategory === "women's clothing"
                    ? "text-blue-500 font-medium"
                    : "text-neutral-300"
                )}
              >
                women's clothing
              </li>
              <li
                onClick={() => setSelectedCategory("")}
                className={clsx(
                  "capitalize  text-base cursor-pointer font-light ",
                  selectedCategory === ""
                    ? "text-blue-500 font-medium"
                    : "text-neutral-300"
                )}
              >
                All
              </li>
            </ul>
            <div className="border-t pt-3 border-t-neutral-500 border-opacity-30 mt-4"></div>
            <div className="px-2">
              <div className="flex justify-between  px-2">
                <label htmlFor="princerange">Price </label>
                <span className="text-neutral-300 text-sm font-light">
                  Rs. {minPrice} - Rs. {maxPrice}
                </span>
              </div>

              <input
                className="rounded-lg mt-2 overflow-hidden w-full appearance-none bg-gray-400 h-3 w-128"
                type="range"
                min="1"
                max="100"
                step="1"
                value={minPrice}
                onChange={(e) =>
                  handlePriceRangeFilter(Number(e.target.value), maxPrice)
                }
              />
              <input
                className="rounded-lg mt-2 overflow-hidden w-full appearance-none bg-gray-400 h-3 w-128"
                type="range"
                min="1"
                max="1000"
                step="1"
                value={maxPrice}
                onChange={(e) =>
                  handlePriceRangeFilter(minPrice, Number(e.target.value))
                }
              />
            </div>
          </div>
        </div>
        <div className=" pl-8 w-full">
          <div className=" pr-14">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 my-7">
                <button
                  type="button"
                  className={"border p-1 rounded-[4px] bg-neutral-500 "}
                >
                  <BsFillGridFill />
                </button>
              </div>
              <p className="w-fit whitespace-pre text-neutral-300 text-lg ml-4">
                {filteredProducts.length > 0
                  ? filteredProducts.length
                  : data?.length}{" "}
                products found
              </p>
              <hr className="w-full text-neutral-700 opacity-30" />
              <form className="whitespace-pre">
                <label htmlFor="sort" className="">
                  Sort by
                </label>
                <select
                  name="sort"
                  id="sort"
                  value={sort}
                  onChange={updateSort}
                  className="bg-neutral-600 rounded-md px-2 py-1 text-neutral-300 ml-2"
                >
                  <option value="price-lowest">price (lowest)</option>
                  <option value="price-highest">price (highest)</option>
                  <option value="name-a">name (a-z)</option>
                  <option value="name-z">name (z-a)</option>
                </select>
              </form>
            </div>
          </div>
          <section>
            {isLoading ? (
              <div className="grid grid-cols-autoFit gap-10 ">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-autoFit gap-10">
                {filteredProducts.length > 0
                  ? filteredProducts.map((product, index) => (
                      <ProductCard key={index} {...product} />
                    ))
                  : data?.map((product, index) => (
                      <ProductCard key={index} {...product} />
                    ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Search;
