"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Product } from "@/types/product"

export default function SearchPage() {

  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  async function searchProducts() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .ilike("product_name", `%${query}%`)

    if (data) setProducts(data)
  }

  return (
    <main style={{ padding: 20 }}>

      <h1>Search Products</h1>

      <input
        placeholder="Search racket, model or code"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchProducts}>
        Search
      </button>

      {products.map((p) => (
        <Link key={p.id} href={`/product/${p.id}`}>
          <div style={{ marginTop: 10 }}>
            {p.product_name}
          </div>
        </Link>
      ))}

    </main>
  )
}