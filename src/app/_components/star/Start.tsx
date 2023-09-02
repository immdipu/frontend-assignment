import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars, reviews }: { stars: number; reviews: number }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index} className="inline-block mr-1 text-yellow-500">
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-3">
      <div>{tempStars}</div>
      <p className="pb-1 text-neutral-400">({reviews} customer reviews)</p>
    </div>
  );
};

export default Stars;
