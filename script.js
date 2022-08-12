let selectedCounter = 0;
const button = document.querySelector("button");

function buttonReady() {
  if (selectedCounter >= 3) {
    button.innerHTML = "Fechar pedido";
    button.classList.add("button-ready");
  }
}

function cancelOrder() {
  const orderPanel = document.querySelector(".close-order");
  const overlay = document.querySelector(".overlay");

  orderPanel.classList.add("hidden");
  overlay.classList.add("hidden");
}

function order() {
  const orderPanel = document.querySelector(".close-order");
  const overlay = document.querySelector(".overlay");
  orderPanel.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function addBorder(element) {

  const parentClass = element.closest(".carrousel").classList[1];
  const selected = document.querySelector(`.${parentClass} .selected`);

  if (selected !== null) {
    selected.classList.remove("selected");
    selectedCounter--;
  }

  element.classList.add("selected");
  selectedCounter++;

  buttonReady();

}

