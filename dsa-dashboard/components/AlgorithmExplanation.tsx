import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AlgorithmExplanationProps {
  sortAlgorithm: string
  searchAlgorithm: string
}

export function AlgorithmExplanation({ sortAlgorithm, searchAlgorithm }: AlgorithmExplanationProps) {
  const getSortExplanation = (algorithm: string) => {
    switch (algorithm) {
      case "bubble":
        return {
          code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
          explanation:
            "Bubble Sort works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The outer loop (i) represents the number of passes, while the inner loop (j) performs the comparisons and swaps. After each pass, the largest unsorted element 'bubbles up' to its correct position at the end of the array.",
        }
      case "quick":
        return {
          code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
          explanation:
            "Quick Sort uses a divide-and-conquer strategy. It selects a 'pivot' element and partitions the array around it. The partition function places the pivot in its correct position and moves all smaller elements to its left and larger elements to its right. This process is then recursively applied to the sub-arrays on either side of the pivot until the entire array is sorted.",
        }
      case "merge":
        return {
          code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
          explanation:
            "Merge Sort divides the array into two halves, recursively sorts them, and then merges the two sorted halves. The merge function compares elements from both halves and places them in the correct order in the result array. This process continues until all elements are merged, resulting in a fully sorted array.",
        }
      default:
        return {
          code: "",
          explanation: "Please select a sorting algorithm.",
        }
    }
  }

  const getSearchExplanation = (algorithm: string) => {
    switch (algorithm) {
      case "linear":
        return {
          code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index if found
    }
  }
  return -1; // Return -1 if not found
}`,
          explanation:
            "Linear Search sequentially checks each element in the array until a match is found or the end of the array is reached. The function returns the index of the target if found, or -1 if not found. While simple and effective for small lists, it has a time complexity of O(n), making it slower for larger datasets.",
        }
      case "binary":
        return {
          code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // Return the index if found
    }
    if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half
    } else {
      right = mid - 1; // Target is in the left half
    }
  }
  return -1; // Return -1 if not found
}`,
          explanation:
            "Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated, and the search continues on the remaining half until the target is found or it's clear the target is not in the array. This results in a time complexity of O(log n), making it much faster than linear search for large datasets.",
        }
      default:
        return {
          code: "",
          explanation: "Please select a search algorithm.",
        }
    }
  }

  const sortInfo = getSortExplanation(sortAlgorithm)
  const searchInfo = getSearchExplanation(searchAlgorithm)

  return (
    <Card className="w-full h-full overflow-auto">
      <CardHeader>
        <CardTitle>Algorithm Explanations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sort">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sort">Sort</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          <TabsContent value="sort" className="space-y-4">
            <h3 className="font-semibold">Sorting Algorithm: {sortAlgorithm}</h3>
            <pre className="bg-muted p-2 rounded-md overflow-x-auto">
              <code>{sortInfo.code}</code>
            </pre>
            <p className="text-sm">{sortInfo.explanation}</p>
          </TabsContent>
          <TabsContent value="search" className="space-y-4">
            <h3 className="font-semibold">Search Algorithm: {searchAlgorithm}</h3>
            <pre className="bg-muted p-2 rounded-md overflow-x-auto">
              <code>{searchInfo.code}</code>
            </pre>
            <p className="text-sm">{searchInfo.explanation}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

