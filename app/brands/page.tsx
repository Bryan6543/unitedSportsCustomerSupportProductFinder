"use client";

import Link from "next/link";

export default function BrandsPage() {
  const brands = [
    {
      name: "WILSON",
      logo: "/brands/wilson.avif",
    },
    {
      name: "YONEX",
      logo: "/brands/yonex.avif",
    },
    {
      name: "LI-NING",
      logo: "/brands/li-ning.avif",
    },
    {
      name: "MIZUNO",
      logo: "/brands/mizuno.avif",
    },
    {
      name: "KARAKAL",
      logo: "/brands/karakal.avif",
    },
    {
      name: "ASHANWAY",
      logo: "/brands/ashanway.avif",
    },
    {
      name: "PRO-TECH",
      logo: "/brands/pro-tech.avif",
    },
  ];

  return (
    <main className="w-[80%] mx-auto pt-20">
      <input type="text" />
      <div className="grid grid-cols-4 gap-5">
        {brands.map((brand) => (
          <Link key={brand.name} href={`/brands/${brand.name}`}>
            <div className="shadow-xl p-5 hover:shadow-3xl hover:scale-105 duration-300 ease-linear hover:border">
              <img src={brand.logo} alt={brand.name} className="" />

              {/* <p className="text-lg text-center p-5">{brand.name}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
