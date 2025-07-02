const container = document.querySelector(".container");
const arrayInput = document.getElementById("array_input");
const clearButton = document.getElementById("btn_clear");
const setButton = document.getElementById("btn_set");
const startButton = document.getElementById("btn_start");
const currentSpeed = document.getElementById("currentSpeed");
const sortingSpeed = document.getElementById("speed");
const containerHeight = container.offsetHeight;

let arr = [];
let maxNumber;
let currentInput;
let animationSpeed;

disableBtn(setButton);
disableBtn(startButton);
currentSpeed.innerText = sortingSpeed.value;

sortingSpeed.addEventListener("input", () => {
  currentSpeed.innerText = sortingSpeed.value;
  animationSpeed = parseInt(sortingSpeed.value);
});

clearButton.addEventListener("click", () => {
  disableBtn(setButton);
  disableBtn(startButton);
  arrayInput.value = "";
  currentInput = "";
  arr = [];
  clearVisual();
});

arrayInput.addEventListener("input", (ev) => {
  currentInput = ev.target.value;
  if (currentInput != "") {
    enableBtn(setButton);
  } else {
    disableBtn(setButton);
  }
});

setButton.addEventListener("click", async () => {
  if (currentInput != undefined) {
    enableBtn(startButton);
    await clearVisual();
    checkForLetters(currentInput);
  } else {
    alert("Enter something");
  }
});

function createArray(str) {
  return str.trim().split(/\s+/).map(Number);
}

function gettingArrayMaxNumber(arr) {
  return Math.max(...arr);
}

function delay(delayTime) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayTime);
  });
}

startButton.addEventListener("click", () => {
  if (arr.length == 0) {
    alert("Enter something");
  } else {
    bubbleSort(arr);
    disableBtn(startButton);
  }
});

function checkForLetters(input) {
  if (/^[0-9 ]+$/.test(input)) {
    arr = createArray(input);
    maxNumber = gettingArrayMaxNumber(arr);
    buildVisual(arr);
  } else {
    alert("Letters detected in input - please remove those");
  }
}

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let current = arr[j];
      let next = arr[j + 1];
      if (current > next) {
        arr[j] = next;
        arr[j + 1] = current;
        await clearVisual();
        buildVisual(arr);
      }
    }
  }
  await delay(500);
  alert("Sorting is finished.");
}

function disableBtn(buttonName) {
  buttonName.disabled = true;
}
function enableBtn(buttonName) {
  buttonName.disabled = false;
}

function buildVisual(array) {
  let maxHeight = containerHeight - 50;
  array.forEach((el) => {
    let div = document.createElement("div");
    let span = document.createElement("span");
    div.classList.add("bar");
    span.classList.add("bar_number");
    if (el == maxNumber) {
      div.style.height = `${maxHeight}px`;
    } else {
      div.style.height = `${(el / maxNumber) * maxHeight}px`;
    }
    span.innerText = el;
    div.appendChild(span);
    container.appendChild(div);
  });
}

function clearVisual() {
  const container = document.querySelector(".container");
  return new Promise((resolve) => {
    setTimeout(() => {
      container.innerHTML = "";
      resolve();
    }, animationSpeed);
  });
}
