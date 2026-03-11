"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const MAX_IMAGES = 12;

  async function searchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .ilike("search_all", `%${query}%`);

    if (data) setProducts(data);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchProducts();
    }
  };
  return (
    <div className="flex justify-center items-center flex-col gap-10 pt-10 w-[80%] m-auto">
      {/* header */}
      <div className="flex items-center justify-between w-2/3">
        <div className="flex flex-co gap-5 justify-center items-center">
          <Image
            src={"/unitedsports_logo.png"}
            width={120}
            height={120}
            alt="unitedsports_logo"
          />
          <div>
            <h1 className="text-2xl font-semibold">
              United Sports <span className="text-base">pvt Ltd.</span>
            </h1>
            <p>Customer Support Product Finder</p>
            <p className="text-xs">Powered by PygeonSolutions</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <input
            placeholder="Search your Product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="shadow py-4 px-2 rounded-xl min-w-2xs border border-black/20"
          />
          <button
            onClick={searchProducts}
            disabled={loading || !query.trim()}
            className="font-medium bg-green-900 text-white disabled:cursor-not-allowed disabled:bg-gray-400 rounded-lg px-8 py-3 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Searched Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((p) => {
          const MAX_IMAGES = 12;
          const mainImageNum = 1;
          const code = p.product_code?.trim() || "";

          if (!code) {
            return (
              <div
                key={p.id}
                className="aspect-square bg-gray-100 rounded-lg"
              />
            );
          }

          const mainSrc = `/${code}/${code}-${mainImageNum}.avif`;
          // const mainSrc = "/unitedsports_logo.png";

          return (
            <Link key={p.id} href={`/product/${p.id}`} className="">
              <div className="flex flex-col gap-2 relative overflow-hiden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Image
                  src={mainSrc}
                  width={250}
                  height={250}
                  alt={`${p.product_name || p.product_code} - main view`}
                  className="w-full"
                  onError={(e) => {
                    e.currentTarget.src = "/unitedsports_logo.png";
                  }}
                  loading="lazy"
                  quality={75}
                />
                <p className="absolute bottom-25 right-5 bg-green-900 p-2 rounded-2xl text-white text-xs font-semibold">
                  LKR {p.price}
                </p>
                <div className="p-2">
                  <h3>{p.product_name}Product Name</h3>
                  <p className="text-xs opacity-70">{p.description}</p>
                  <p className="text-[10px] opacity-70">{p.product_code}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Brands */}
        <Link
          href="/brands"
          className="flex shadow-sm hover:shadow-xl flex-col gap-5 justify-center items-center hover:scale-105 duration-300 hover:bg-green-900 hover:text-white pb-5 rounded-2xl ease-linear"
        >
          <Image
            src={"/brands_category_image.jpg"}
            width={400}
            height={400}
            alt="brands_category"
            className="shadow-black/30 shadow-lg rounded-t-2xl"
          />
          <button className="text-3xl">Brands</button>
        </Link>

        {/* Sports Categories */}
        <Link
          href="/search"
          className="flex shadow-sm hover:shadow-xl flex-col gap-5 justify-center items-center hover:scale-105 duration-300 hover:bg-green-900 hover:text-white pb-5 rounded-2xl ease-linear"
        >
          <Image
            src={"/sports_category_image.jpg"}
            width={400}
            height={400}
            alt="brands_category"
            className="shadow-black/30 shadow-lg rounded-t-2xl"
          />
          <button className="text-3xl">Sports</button>
        </Link>

        {/* Product Categories */}
        <Link
          href="/search"
          className="flex shadow-sm hover:shadow-xl flex-col gap-5 justify-center items-center hover:scale-105 duration-300 hover:bg-green-900 hover:text-white pb-5 rounded-2xl ease-linear"
        >
          <Image
            src={"/product_type_image.png"}
            width={400}
            height={400}
            alt="brands_category"
            className="shadow-black/30 shadow-lg rounded-t-2xl"
          />
          <button className="text-3xl">Products</button>
        </Link>

        <Link href="/recommend">
          <button>Product Type</button>
        </Link>
        <Link href="/recommend">
          <button>Recommend Survey</button>
        </Link>
      </div>
    </div>
  );
}
