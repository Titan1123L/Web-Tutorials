export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Bubble Sort
export function bubbleSort(arr: Product[], key: keyof Product): Product[] {
  const sortedArr = [...arr];
  const n = sortedArr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArr[j][key] > sortedArr[j + 1][key]) {
        [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
      }
    }
  }
  return sortedArr;
}

// Quick Sort
export function quickSort(arr: Product[], key: keyof Product): Product[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)][key];
  const left = arr.filter(x => x[key] < pivot);
  const middle = arr.filter(x => x[key] === pivot);
  const right = arr.filter(x => x[key] > pivot);

  return [...quickSort(left, key), ...middle, ...quickSort(right, key)];
}

// Merge Sort
export function mergeSort(arr: Product[], key: keyof Product): Product[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left, key), mergeSort(right, key), key);
}

function merge(left: Product[], right: Product[], key: keyof Product): Product[] {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][key] < right[rightIndex][key]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Linear Search
export function linearSearch(arr: Product[], key: keyof Product, target: any): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === target) return i;
  }
  return -1;
}

// Binary Search (assumes sorted array)
export function binarySearch(arr: Product[], key: keyof Product, target: any): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid][key].toString().toLowerCase();
    const targetValue = target.toString().toLowerCase();

    if (midValue === targetValue) return mid;
    if (midValue < targetValue) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function bubbleSortWithSteps(arr: Product[], key: keyof Product, setProducts: (products: Product[]) => void): Promise<Product[]> {
  const sortedArr = [...arr];
  const n = sortedArr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArr[j][key] > sortedArr[j + 1][key]) {
        [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
        setProducts([...sortedArr]);
        await delay(100);
      }
    }
  }
  return sortedArr;
}

export async function quickSortWithSteps(arr: Product[], key: keyof Product, setProducts: (products: Product[]) => void): Promise<Product[]> {
  const sort = async (low: number, high: number) => {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await sort(low, pivotIndex - 1);
      await sort(pivotIndex + 1, high);
    }
  };

  const partition = async (low: number, high: number): Promise<number> => {
    const pivot = arr[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j][key] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setProducts([...arr]);
        await delay(100);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setProducts([...arr]);
    await delay(100);

    return i + 1;
  };

  await sort(0, arr.length - 1);
  return arr;
}

