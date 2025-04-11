"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "./ProductCard"
import { AddProduct } from "./AddProduct"
import {
  type Product,
  bubbleSortWithSteps,
  quickSortWithSteps,
  mergeSort,
  linearSearch,
  binarySearch,
} from "../utils/algorithms"
import { ArrowUpDown, Search, RefreshCw, LogOut } from "lucide-react"
import { DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useAuth } from "../contexts/AuthContext"
import { AlgorithmExplanation } from "./AlgorithmExplanation"

const initialProducts: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 50 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 599.99, stock: 100 },
  { id: 3, name: "Headphones", category: "Audio", price: 149.99, stock: 200 },
  { id: 4, name: "Camera", category: "Electronics", price: 449.99, stock: 30 },
  { id: 5, name: "Tablet", category: "Electronics", price: 349.99, stock: 75 },
  { id: 6, name: "Smartwatch", category: "Wearables", price: 199.99, stock: 150 },
  { id: 7, name: "Bluetooth Speaker", category: "Audio", price: 79.99, stock: 100 },
  { id: 8, name: "Gaming Console", category: "Gaming", price: 399.99, stock: 25 },
  { id: 9, name: "Wireless Earbuds", category: "Audio", price: 129.99, stock: 200 },
  { id: 10, name: "Fitness Tracker", category: "Wearables", price: 89.99, stock: 180 },
  { id: 11, name: "External Hard Drive", category: "Storage", price: 119.99, stock: 90 },
  { id: 12, name: "Wireless Mouse", category: "Accessories", price: 39.99, stock: 250 },
]

function SortableProductCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.product.id.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProductCard {...props} />
    </div>
  )
}

export function ProductInventoryDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchResult, setSearchResult] = useState<Product[] | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [sortAlgorithm, setSortAlgorithm] = useState("bubble")
  const [searchAlgorithm, setSearchAlgorithm] = useState("linear")
  const [sortKey, setSortKey] = useState<keyof Product>("price")
  const [searchKey, setSearchKey] = useState<keyof Product>("name")
  const [isSorting, setIsSorting] = useState(false)
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null)

  const { user, logout } = useAuth()

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const shuffleProducts = () => {
    const shuffled = [...initialProducts].sort(() => Math.random() - 0.5)
    setProducts(shuffled)
    setSearchResult(null)
  }

  const sortProducts = async () => {
    setIsSorting(true)
    let sorted: Product[]
    switch (sortAlgorithm) {
      case "bubble":
        sorted = await bubbleSortWithSteps([...products], sortKey, setProducts)
        break
      case "quick":
        sorted = await quickSortWithSteps([...products], sortKey, setProducts)
        break
      case "merge":
        sorted = mergeSort([...products], sortKey)
        setProducts(sorted)
        break
      default:
        sorted = products
    }
    setIsSorting(false)
    setSearchResult(null)
  }

  const searchProducts = () => {
    if (!searchValue) {
      alert("Please enter a search value")
      return
    }

    let results: Product[]
    const dataToSearch = products

    if (searchAlgorithm === "linear") {
      results = dataToSearch.filter((product) =>
        product[searchKey].toString().toLowerCase().includes(searchValue.toLowerCase()),
      )
    } else {
      // For binary search, we'll first sort the array and then find all matching elements
      const sortedData = [...dataToSearch].sort((a, b) =>
        a[searchKey].toString().localeCompare(b[searchKey].toString()),
      )
      const index = binarySearch(sortedData, searchKey, searchValue)
      if (index !== -1) {
        results = [sortedData[index]]
        // Check for more matches in both directions
        let left = index - 1
        let right = index + 1
        while (left >= 0 && sortedData[left][searchKey].toString().toLowerCase() === searchValue.toLowerCase()) {
          results.unshift(sortedData[left])
          left--
        }
        while (
          right < sortedData.length &&
          sortedData[right][searchKey].toString().toLowerCase() === searchValue.toLowerCase()
        ) {
          results.push(sortedData[right])
          right++
        }
      } else {
        results = []
      }
    }

    setSearchResult(results)
  }

  const handleDragStart = (event) => {
    const { active } = event
    setDraggedProduct(products.find((p) => p.id.toString() === active.id))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item.id.toString() === active.id)
        const newIndex = items.findIndex((item) => item.id.toString() === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setDraggedProduct(null)
  }

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct])
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Interactive Product Inventory Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span>
              Welcome, {user?.username} ({user?.role})
            </span>
            <Button onClick={logout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-3/4 space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Button onClick={shuffleProducts} variant="outline" disabled={isSorting}>
                <RefreshCw className="mr-2 h-4 w-4" /> Shuffle Products
              </Button>

              <div className="flex items-center space-x-2">
                <Label htmlFor="sort-select">Sort:</Label>
                <Select value={sortAlgorithm} onValueChange={setSortAlgorithm}>
                  <SelectTrigger id="sort-select" className="w-[140px]">
                    <SelectValue placeholder="Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bubble">Bubble Sort</SelectItem>
                    <SelectItem value="quick">Quick Sort</SelectItem>
                    <SelectItem value="merge">Merge Sort</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortKey} onValueChange={(value) => setSortKey(value as keyof Product)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stock">Stock</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={sortProducts} variant="secondary" disabled={isSorting}>
                  <ArrowUpDown className="mr-2 h-4 w-4" /> {isSorting ? "Sorting..." : "Sort"}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Label htmlFor="search-select">Search:</Label>
                <Select value={searchAlgorithm} onValueChange={setSearchAlgorithm}>
                  <SelectTrigger id="search-select" className="w-[140px]">
                    <SelectValue placeholder="Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear Search</SelectItem>
                    <SelectItem value="binary">Binary Search</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={searchKey} onValueChange={(value) => setSearchKey(value as keyof Product)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Search by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="id">ID</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Enter search value"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-40"
                />
                <Button onClick={searchProducts} variant="secondary">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>

            {searchResult !== null && (
              <div className="bg-muted p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
                {searchResult.length === 0 ? (
                  <p>No products found</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResult.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {user?.role === "admin" && <AddProduct onAddProduct={handleAddProduct} />}

            <SortableContext items={products.map((p) => p.id.toString())} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <SortableProductCard key={product.id} product={product} />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>{draggedProduct ? <ProductCard product={draggedProduct} isDragging /> : null}</DragOverlay>
          </div>

          <div className="w-full lg:w-1/4 sticky top-4 h-fit">
            <AlgorithmExplanation sortAlgorithm={sortAlgorithm} searchAlgorithm={searchAlgorithm} />
          </div>
        </div>
      </div>
    </DndContext>
  )
}

