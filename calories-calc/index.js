// Получаем данные из localStorage
let foods = JSON.parse(localStorage.getItem("foods")) || [];
let dailyGoal = parseInt(localStorage.getItem("dailyGoal")) || 2000;

// Функция добавления продукта
function addFood() {
  const foodName = document.getElementById("foodName").value;
  const weight = parseInt(document.getElementById("foodWeight").value);
  const calories = parseInt(document.getElementById("calories").value);

  if (foodName && calories) {
    foods.push({
      name: foodName,
      calories: Math.floor((calories * weight) / 100),
    });
    updateLocalStorage();
    updateUI();
  }
}

// Функция обновления данных в localStorage
function updateLocalStorage() {
  localStorage.setItem("foods", JSON.stringify(foods));
  localStorage.setItem("dailyGoal", dailyGoal);
}

// Функция обновления интерфейса
function updateUI() {
  const foodTable = document.getElementById("foodTable");

  foodTable.innerHTML =
    "<tr><th onclick='sortByName()'>Название</th><th onclick='sortByCalories()'>Калории</th><th><button onClick='clearTable()'>Очистить</button></th></tr>";

  let total = 0;

  foods.forEach((food, index) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const caloriesCell = document.createElement("td");
    const deleteCell = document.createElement("td");

    nameCell.textContent = food.name;
    caloriesCell.textContent = food.calories;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => deleteFood(index));
    deleteCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(caloriesCell);
    row.appendChild(deleteCell);
    foodTable.appendChild(row);

    total += food.calories;
  });

  function deleteFood(index) {
    foods.splice(index, 1);
    updateLocalStorage();
    updateUI();
  }

  // Функция обновления графика
  function updateChart(percent) {
    const barProgress = document.getElementById("bar-progress");
    console.log(total);
    if (percent > 100) {
      barProgress.style.display = "block";
      barProgress.style.backgroundColor = "red";
      barProgress.style.width = "100%";
      document.getElementById("total").innerHTML = total;
      document.getElementById("goal").innerHTML = dailyGoal;
    } else if (percent > 0) {
      let width = percent;
      barProgress.style.display = "block";
      barProgress.style.backgroundColor = "#d47616";
      barProgress.style.width = `${width}%`;
      document.getElementById("total").innerHTML = total;
      document.getElementById("goal").innerHTML = dailyGoal;
    }
  }

  // Обновляем график
  updateChart(Math.floor((total / dailyGoal) * 100));
}

function clearTable() {
  foods = [];
  updateLocalStorage();
  updateUI();
}

function sortByName() {
  foods.sort((a, b) => a.name.localeCompare(b.name));
  updateUI();
}

// Функция сортировки по калорийности
function sortByCalories() {
  foods.sort((a, b) => a.calories - b.calories);
  updateUI();
}

function changeGoal() {
  document.querySelector(".modal").style.display = "block";
}

function hideModal() {
  document.querySelector(".modal").style.display = "none";
}

function setGoal() {
  dailyGoal = parseInt(document.getElementById("newGoal").value);
  updateLocalStorage();
  updateUI();
  hideModal();
}

// Инициализация при загрузке страницы
updateUI();
