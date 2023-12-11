let targetNumber;
let attempts = 0;
let startNumber;
let endNumber;
const chooseElement = document.querySelector(".chooseRange");
const guessElement = document.querySelector(".guessNumber");

function startGame() {
  // Задаем число
  targetNumber =
    Math.floor(Math.random() * (endNumber - startNumber + 1)) + startNumber;
  attempts = 0;
  document.getElementById("result").innerText = "";

  document.querySelector(
    "label"
  ).innerHTML = `Введите число от ${startNumber} до ${endNumber}:`;
  chooseElement.style.display = "none";
  guessElement.style.display = "block";
}

function checkGuess() {
  const guessInput = document.getElementById("guess");
  const userGuess = parseInt(guessInput.value);
  console.log(targetNumber, startNumber, endNumber);

  // Проверка введенного числа
  if (isNaN(userGuess) || userGuess < startNumber || userGuess > endNumber) {
    alert(`Введите число от ${startNumber} до ${endNumber}`);
    return;
  }

  attempts++;

  if (userGuess === targetNumber) {
    document.getElementById(
      "result"
    ).innerText = `Поздравляем! Вы угадали число за ${formatNumberWithEnding(
      attempts,
      ["попытку", "попытки", "попыток"]
    )}.`;
  } else {
    let hint = userGuess < targetNumber ? "Больше." : "Меньше.";
    if (attempts % 3 === 0) {
      hint += targetNumber % 2 === 0 ? " Число четное." : " Число нечетное.";
    }
    document.getElementById("result").innerText = hint;
  }
}

function setDiapason() {
  const startInput = document.getElementById("startInput");
  const endInput = document.getElementById("endInput");

  const start = parseInt(startInput.value);
  const end = parseInt(endInput.value);
  if (start && end && start < end) {
    startNumber = start;
    endNumber = end;
    startGame();
  }
}

// Функция склонения окончания взята из задания L1
function getWordEnding(number, forms) {
  // Определяем последнюю и последние две цифры, если число больше 100
  const remainder10 = number % 10;
  const remainder100 = number % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    // Возвращаем первую форму если число заканчивается на 1 и последние 2 цифры у чисел больше 100 не 11
    return forms[0];
  } else if (
    [2, 3, 4].includes(remainder10) &&
    ![12, 13, 14].includes(remainder100)
  ) {
    // Возвращаем первую форму если число заканчивается на 2, 3, 4 и последние 2 цифры у чисел больше 100 не 12, 13, 14
    return forms[1];
  } else {
    // Возвращаем третью форму для всех остальных случаев
    return forms[2];
  }
}

// Основная функция, которую экспортируем из модуля
function formatNumberWithEnding(number, words) {
  // Определяем окончание и добавляем его к числу
  const wordEnding = getWordEnding(number, words);
  return `${number} ${wordEnding}`;
}
