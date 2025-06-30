let arr = [8, 5, 2, 14, 5, 1, 3, 10, 4];
let animationSpeed = 100;

const container = document.querySelector(".container");
const startButton = document.querySelector(".btn");
const containerHeight = container.offsetHeight;
const maxNumber = Math.max(...arr);

buildVisual(arr);

async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
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
  console.log("Sorting is finished.");
}

function buildVisual(array) {
  let maxHeight = containerHeight - 50;
  array.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("bar");
    if (el == maxNumber) {
      div.style.height = `${maxHeight}px`;
    } else {
      div.style.height = `${(el / maxNumber) * maxHeight}px`;
    }
    div.innerText = el;
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

startButton.addEventListener("click", () => {
  bubbleSort(arr);
});
