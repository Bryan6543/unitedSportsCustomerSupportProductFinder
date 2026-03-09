"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types/product"

export default function RecommendPage() {

  const [products, setProducts] = useState<Product[]>([])

  async function getPowerRackets() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("perk", "Power")

    if (data) setProducts(data)
  }

  return (
    <main style={{ padding: 20 }}>

      <h1>Find Your Play Style</h1>

      <button onClick={getPowerRackets}>
        ⚡ Power
      </button>

      {products.map((p) => (
        <div key={p.id}>
          {p.product_name}
        </div>
      ))}

    </main>
  )
}