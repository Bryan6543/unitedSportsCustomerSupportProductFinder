"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Category {
  id: string
  name: string
}

export default function CategoryPage() {

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")

    if (data) setCategories(data)
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Select Category</h1>

      {categories.map((cat) => (
        <Link key={cat.id} href={`/category/${cat.id}`}>
          <div style={{ border: "1px solid #ccc", padding: 12, marginTop: 10 }}>
            {cat.name}
          </div>
        </Link>
      ))}

    </main>
  )
}