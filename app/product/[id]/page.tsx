"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Product } from "@/types/product"

export default function ProductPage() {

  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single()

    if (data) setProduct(data)
  }

  if (!product) return <p>Loading...</p>

  return (
    <main style={{ padding: 20 }}>

      <h1>{product.product_name}</h1>

      <img
        src={product.image_url}
        style={{ width: "100%", maxWidth: 300 }}
      />

      <p>Variant: {product.variant}</p>
      <p>Weight: {product.weight}g</p>
      <p>Color: {product.color}</p>
      <p>Size: {product.size}</p>
      <p>Product Code: {product.product_code}</p>

    </main>
  )
}