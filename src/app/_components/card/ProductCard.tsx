import React from "react";
import { Images } from "..";
import { AiOutlineStar } from "react-icons/ai";
import { Product } from "@/types/productTypes";
import Link from "next/link";

const ProductCard: React.FC<Product> = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}) => {
  return (
    <Link
      href={`product/${id}`}
      className="w-52 max-md:w-40  block bg-neutral-950 pb-4"
    >
      <div className="w-full rounded-md">
        <Images
          src={image}
          height={200}
          width={200}
          ImageWidth={"full"}
          Imageheight={280}
          rounded="lg"
          objectFit="cover"
          alt="imafee"
        />
      </div>
      <h3 className="text-base max-md:text-sm px-3 leading-6 py-2 font-light text-start">
        {title}
      </h3>
      <div>
        {rating?.rate && (
          <div className="flex px-3 gap-2 items-end">
            <div className="flex gap-1 items-center bg-neutral-700 w-fit px-2 py-1 rounded-lg">
              <span className="text-xs font-normal text-neutral-300">
                {Number(rating.rate)}
              </span>

              <AiOutlineStar className="text-sm" />
            </div>
            <span className="text-xs font-extralight mb-1 text-neutral-400">
              ({rating.count})
            </span>
          </div>
        )}
        <div className="px-4 text-neutral-100 mt-2">Rs. {price}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
