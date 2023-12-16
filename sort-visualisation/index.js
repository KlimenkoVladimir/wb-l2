let array = [];
let animationSpeed = 300; // Задержка в миллисекундах между шагами алгоритма
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
    // bar.textContent = value;
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

function insertionSort() {
  console.log("insert");

  let i = 1;

  function nextIteration() {
    if (sortingStopped) {
      arrayContainer.children[i].style.backgroundColor = "red";
      return;
    }

    if (i < array.length) {
      let key = array[i];
      let j = i - 1;

      arrayContainer.children[i].style.backgroundColor = "red";
      setTimeout(() => {
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          renderArray();
          j--;
        }
        array[j + 1] = key;
        renderArray();

        arrayContainer.children[i].style.backgroundColor = "blue";
        i++;
        nextIteration();
      }, animationSpeed);
    } else {
      // Sorting is complete
      sortingStopped = true;
    }
  }

  // Start the first iteration
  nextIteration();
}
