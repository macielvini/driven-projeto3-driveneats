const button = document.querySelector("#close-order");
const orderPanel = document.querySelector(".close-order");
const overlay = document.querySelector(".overlay");
const receiptTotal = document.querySelector("#total");
let totalSum = 0;
let selectedCounter = 0;


function formatNumber(num) {
  let formatedNum = num.replace(",", ".");
  formatedNum = Number(formatedNum);
  return Number(formatedNum);
}

function buttonReady() {
  if (selectedCounter >= 3) {
    button.innerHTML = "Fechar pedido";
    button.classList.add("button-ready");
  }
}

function order() {
  if (selectedCounter >= 3) {
    orderPanel.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}

function cancelOrder() {
  orderPanel.classList.add("hidden");
  overlay.classList.add("hidden");
}

function addShadow(element) {
  const parentClass = element.closest(".carrousel").classList[1];
  const selected = document.querySelector(`.${parentClass} .selected`);

  if (selected !== null) {
    removeFromReceipt(parentClass);
    selected.classList.remove("selected");
    selectedCounter--;
  }

  element.classList.add("selected");
  addToReceipt(element, parentClass);
  selectedCounter++;

  buttonReady();
}

function addToReceipt(element, parent) {

  const receipt = document.querySelector(".receipt");
  const description = element.querySelector(".selected h3").innerHTML;
  const price = formatNumber(element.querySelector(".price").innerHTML);

  totalSum += price;
  receiptTotal.innerHTML = totalSum.toFixed(2).replace(".", ",");

  receipt.innerHTML += `<div class="item ${parent}"><span>${description}</span><span class="price">${price.toFixed(2).replace(".", ",")}</span></div>`;
}

function removeFromReceipt(parentClass) {
  const item = document.querySelector(`.receipt .${parentClass}`);

  totalSum -= formatNumber(item.querySelector(".price").innerHTML);
  item.remove();

  receiptTotal.innerHTML = totalSum.toFixed(2).replace(".", ",");
}

function whatsappOrder() {
  const meal = document.querySelector(".receipt .meals span").innerHTML;
  const drink = document.querySelector(".receipt .drinks span").innerHTML;
  const dessert = document.querySelector(".receipt .desserts span").innerHTML;
  const clientName = document.querySelector("#clientName").value;
  const clientAdress = document.querySelector("#clientAdress").value;
  console.log(clientName);

  const message = encodeURIComponent(`Olá, gostaria de fazer o pedido:\n- Prato: ${meal}\n- Bebida: ${drink}\n- Sobremesa: ${dessert}\nTotal: R$ ${totalSum.toFixed(2)}\n\nNome: ${clientName}\nEndereço: ${clientAdress}`);

  window.open(`https://api.whatsapp.com/send?phone=5511993894878&text=${message}`, "_blank").focus();
  console.log(message);

  //para quebrar linha, adicionar %0a no link
}

function addItem(element) {
  addShadow(element);
}