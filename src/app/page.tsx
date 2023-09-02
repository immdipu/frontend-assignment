import Images from "./_components/imageComponent/Images";
import { Product } from "@/types/productTypes";
import CarouselContainer from "./_components/carousel";
import { Metadata } from "next";
import FeaturedProduct from "./_components/featuredProduct/FeaturedProduct";

export const metadata: Metadata = {
  title: "E-commerce | Home",
};

async function Products() {
  const res = await fetch(`https://fakestoreapi.com/products?limit=8`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data: Product[] = await Products();

  return (
    <div className="w-11/12 mx-auto">
      {data ? (
        <section className=" relative overflow-hidden   rounded-3xl">
          <CarouselContainer data={data} />
        </section>
      ) : (
        <div>No data found</div>
      )}
      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-wide">
          Featured Product
        </h2>
        <div className="py-10 ">
          <FeaturedProduct />
        </div>
      </section>
    </div>
  );
}
