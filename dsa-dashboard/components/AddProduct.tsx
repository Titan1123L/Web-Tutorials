'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '../utils/algorithms'

interface AddProductProps {
  onAddProduct: (product: Product) => void
}

export function AddProduct({ onAddProduct }: AddProductProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct: Product = {
      id: Date.now(), // Use timestamp as a simple unique id
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
    }
    onAddProduct(newProduct)
    // Reset form
    setName('')
    setCategory('')
    setPrice('')
    setStock('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  )
}

