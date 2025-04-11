'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { bubbleSort, quickSort, mergeSort, linearSearch, binarySearch } from '../utils/algorithms'

export function DSADashboard() {
  const [data, setData] = useState<number[]>([])
  const [sortedData, setSortedData] = useState<number[]>([])
  const [searchResult, setSearchResult] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [sortAlgorithm, setSortAlgorithm] = useState('bubble')
  const [searchAlgorithm, setSearchAlgorithm] = useState('linear')

  const generateRandomData = () => {
    const newData = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
    setData(newData)
    setSortedData([])
    setSearchResult(null)
  }

  const sortData = () => {
    let sorted: number[]
    switch (sortAlgorithm) {
      case 'bubble':
        sorted = bubbleSort(data)
        break
      case 'quick':
        sorted = quickSort(data)
        break
      case 'merge':
        sorted = mergeSort(data)
        break
      default:
        sorted = data
    }
    setSortedData(sorted)
  }

  const searchData = () => {
    const target = parseInt(searchValue)
    if (isNaN(target)) {
      alert('Please enter a valid number')
      return
    }

    let result: number
    if (searchAlgorithm === 'linear') {
      result = linearSearch(sortedData.length > 0 ? sortedData : data, target)
    } else {
      if (sortedData.length === 0) {
        alert('Please sort the data before using Binary Search')
        return
      }
      result = binarySearch(sortedData, target)
    }

    setSearchResult(result)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">DSA Sorting and Searching Dashboard</h1>
      
      <div className="space-y-2">
        <Button onClick={generateRandomData}>Generate Random Data</Button>
        <div className="text-sm">
          Data: {data.join(', ')}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="sort-select">Sort Algorithm:</Label>
          <Select value={sortAlgorithm} onValueChange={setSortAlgorithm}>
            <SelectTrigger id="sort-select" className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bubble">Bubble Sort</SelectItem>
              <SelectItem value="quick">Quick Sort</SelectItem>
              <SelectItem value="merge">Merge Sort</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={sortData}>Sort</Button>
        </div>
        <div className="text-sm">
          Sorted Data: {sortedData.join(', ')}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="search-select">Search Algorithm:</Label>
          <Select value={searchAlgorithm} onValueChange={setSearchAlgorithm}>
            <SelectTrigger id="search-select" className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linear">Linear Search</SelectItem>
              <SelectItem value="binary">Binary Search</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Enter number to search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-40"
          />
          <Button onClick={searchData}>Search</Button>
        </div>
        <div className="text-sm">
          Search Result: {searchResult !== null ? (searchResult === -1 ? 'Not found' : `Found at index ${searchResult}`) : 'N/A'}
        </div>
      </div>
    </div>
  )
}

