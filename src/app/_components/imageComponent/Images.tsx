"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import failedImage from "@/assets/failedImage.png";
import clsx from "clsx";

interface ImagesProps {
  src: string;
  width: number;
  height: number;
  alt: string | undefined;
  ImageWidth?: number | "full";
  Imageheight?: number | "full";
  rounded?: string;
  objectFit?: "cover" | "contain";
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const Images: React.FC<ImagesProps> = ({
  src,
  width,
  height,
  alt,
  ImageWidth = 36,
  Imageheight = 210,
  rounded = "lg",

  objectFit = "cover",
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);
  return (
    <div className={"overflow-hidden " + `rounded-${rounded}`}>
      <Image
        src={imgSrc}
        width={width}
        height={height}
        alt={alt ?? "poster"}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            setImgSrc(failedImage);
          }
        }}
        onError={() => {
          console.log("error occured");
          setImgSrc(failedImage);
        }}
        className={clsx(
          "select-none  max-md:w-28  ",
          `w-${ImageWidth} rounded-${rounded} `,
          "max-md:!h-36"
        )}
        style={{ objectFit: `${objectFit}`, height: `${Imageheight}px` }}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(failedImage.src)}`}
      />
    </div>
  );
};

export default Images;
