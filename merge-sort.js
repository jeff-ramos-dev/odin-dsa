function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)))
  let right = mergeSort(arr.slice(Math.floor(arr.length / 2)))
  let sortedArray = []
  let l = 0
  let r = 0
  while (l < left.length || r < right.length) {
    if (l === left.length) {
      while (r < right.length) {
        sortedArray.push(right[r])
        r++
      }
    } else if (r === right.length) {
      while (l < left.length) {
        sortedArray.push(left[l])
        l++
      }
    } else if (left[l] < right[r]) {
      sortedArray.push(left[l])
      l++
    } else {
      sortedArray.push(right[r])
      r++
    }
  }
  return sortedArray
}

console.log(mergeSort([2, 1]))
console.log(mergeSort([3, 4, 1, 2]))
console.log(mergeSort([4, 8, 6, 2, 1, 7, 5, 3]))
console.log(mergeSort([50, 14, -2, 0, -13, 27, 132, -132, 4]))