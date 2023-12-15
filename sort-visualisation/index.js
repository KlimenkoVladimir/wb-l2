let array = [];
let animationSpeed = 100; // Задержка в миллисекундах между шагами алгоритма
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
  const selectedAlgorithm = document.getElementById("algorithm").value;
  if (selectedAlgorithm === "bubble") {
    bubbleSort();
  }
  // Добавьте другие алгоритмы сортировки, если необходимо
}

function stopSorting() {
  clearInterval(sortingInterval);
}

function swap(i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSort() {
  let i = 0;
  sortingInterval = setInterval(() => {
    if (i < array.length - 1) {
      let j = 0;
      (function animate() {
        if (j < array.length - i - 1) {
          arrayContainer.children[j].style.backgroundColor = "red";
          setTimeout(() => {
            if (array[j] > array[j + 1]) {
              swap(j, j + 1);
              renderArray();
            }
            arrayContainer.children[j].style.backgroundColor = "blue";
            j++;
            animate();
          }, animationSpeed);
        } else {
          i++;
          setTimeout(() => {
            animate();
          }, animationSpeed);
        }
      })();
    } else {
      clearInterval(sortingInterval);
    }
  }, 0);
}
