let array = [];
let animationSpeed = 50; // Задержка в миллисекундах между шагами алгоритма
let sortingInterval;
const arrayContainer = document.getElementById("array-container");

function generateArray() {
  const inputArray = document.getElementById("input-array").value;
  array = inputArray.split(",").map(Number);
  renderArray();
}

function renderArray() {
  arrayContainer.innerHTML = "";
  array.forEach((value, index) => {
    const bar = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = value;
    bar.className = "array-bar";
    bar.style.height = `${value * 3}px`;
    bar.style.width = `${40}px`;
    arrayContainer.appendChild(bar);
    bar.appendChild(span);
  });
}

function startSorting() {
  sortingStopped = false;
  const selectedAlgorithm = document.getElementById("algorithm").value;
  if (selectedAlgorithm === "bubble") {
    bubbleSort();
  } else if (selectedAlgorithm === "insertion") {
    insertionSort();
  } else if (selectedAlgorithm === "quick") {
    quickSort(array);
  } else if (selectedAlgorithm === "selection") {
    selectionSort();
  }
  // Добавьте другие алгоритмы сортировки, если необходимо
}
let sortingStopped = false;
function stopSorting() {
  sortingStopped = true;
}

function swap(i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSort() {
  let i = 0;
  let j = 0;

  function nextIteration() {
    if (sortingStopped) {
      arrayContainer.children[j].style.backgroundColor = "red";
      return;
    }

    if (j < array.length - i - 1) {
      arrayContainer.children[j].style.backgroundColor = "red";
      setTimeout(() => {
        if (array[j] > array[j + 1]) {
          swap(j, j + 1);
          renderArray();
        }
        arrayContainer.children[j].style.backgroundColor = "blue";
        j++;
        nextIteration();
      }, animationSpeed);
    } else {
      // Move to the next outer loop iteration
      j = 0;
      i++;

      if (i < array.length - 1) {
        setTimeout(nextIteration, animationSpeed);
      } else {
        // Sorting is complete
        sortingStopped = true;
      }
    }
  }

  // Start the first iteration
  nextIteration();
}

function selectionSort() {
  let i = 0;
  let minIndex = 0;

  function nextIteration() {
    if (sortingStopped) {
      arrayContainer.children[minIndex].style.backgroundColor = "red";
      return;
    }

    if (i < array.length - 1) {
      minIndex = i;

      for (let j = i + 1; j < array.length; j++) {
        arrayContainer.children[j].style.backgroundColor = "red";
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      setTimeout(() => {
        swap(i, minIndex);
        renderArray();
        arrayContainer.children[minIndex].style.backgroundColor = "blue";
        arrayContainer.children[i].style.backgroundColor = "blue";
        i++;
        nextIteration();
      }, animationSpeed);
    } else {
      // Sorting is complete
      sortingStopped = true;
      arrayContainer.children[minIndex].style.backgroundColor = "blue";
    }
  }

  // Start the first iteration
  nextIteration();
}

function insertionSort() {
  console.log("insert");

  let i = 1;

  function nextIteration() {
    if (sortingStopped) {
      arrayContainer.children[i].style.backgroundColor = "red";
      return;
    }

    if (i < array.length) {
      let indexMin = i;
      let j = i + 1;

      function processNextElement() {
        if (j < array.length) {
          arrayContainer.children[j].style.backgroundColor = "red";
          setTimeout(() => {
            if (array[j] < array[indexMin]) {
              indexMin = j;
            }
            arrayContainer.children[j].style.backgroundColor = "blue";
            j++;
            processNextElement();
          }, animationSpeed);
        } else {
          swap(i, indexMin);
          renderArray();
          arrayContainer.children[i].style.backgroundColor = "blue";
          i++;
          nextIteration();
        }
      }

      processNextElement();
    } else {
      // Sorting is complete
      sortingStopped = true;
    }
  }

  // Start the first iteration
  nextIteration();
}

// function quickSort(array) {
//   if (array.length <= 1) {
//     return array;
//   }
//   let pivotIndex = Math.floor(array.length / 2);
//   let pivot = array[pivotIndex];
//   let less = [];
//   let greater = [];

//   for (let i = 0; i < array.length; i++) {
//     if (array[i] === pivot) {
//       continue;
//     }
//     if (array[i] < pivot) {
//       less.push(array[i]);
//     }
//     if (array[i] > pivot) {
//       greater.push(array[i]);
//     }
//   }

//   return [...quickSort(less), pivot, ...quickSort(greater)];
// }

function quickSort(array, start = 0, end = array.length - 1) {
  if (start < end) {
    let pivotIndex = partition(array, start, end);

    setTimeout(() => {
      quickSort(array, start, pivotIndex - 1);
    }, animationSpeed * array.length);

    setTimeout(() => {
      quickSort(array, pivotIndex + 1, end);
    }, animationSpeed * array.length);
  } else {
    sortingStopped = true;
    renderArray();
  }
}

function partition(array, start, end) {
  let middleIndex = Math.floor((start + end) / 2);
  let pivotIndex = middleIndex;
  let pivot = array[pivotIndex];
  swap(end, pivotIndex);

  let i = start - 1;

  for (let j = start; j < end; j++) {
    if (array[j] <= pivot) {
      i++;
      swap(i, j);
    }
  }
  swap(i + 1, end);
  return i + 1;
}

function startQuickSort() {
  sortingStopped = false;
  quickSort(array);
}
