"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

export default function BrandProductsPage() {
  const params = useParams();
  const brand = params.brand as string;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("brand_name", brand);

    if (data) {
      setProducts(data);
    }
  }

  return (
    <main className="w-[80%] m-auto">
      <h1 className="text-5xl text-center py-20 font-bold">{brand} Products</h1>
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
    </main>
  );
}
