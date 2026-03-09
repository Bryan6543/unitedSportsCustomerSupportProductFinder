"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Product } from "@/types/product"

export default function CategoryProductsPage() {

  const params = useParams()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", params.id)

    if (data) setProducts(data)
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Products</h1>

      {products.map((p) => (
        <Link key={p.id} href={`/product/${p.id}`}>
          <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
            <h3>{p.product_name}</h3>
            <p>{p.variant}</p>
          </div>
        </Link>
      ))}

    </main>
  )
}