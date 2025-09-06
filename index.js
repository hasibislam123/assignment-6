const categoryList = document.getElementById("category-list");
const plantList = document.getElementById("plant-list");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const spinner = document.getElementById("spinner");
const modal = document.getElementById("modal");

let cart = [];

// Spinner functions
function showSpinner() { spinner.classList.remove("hidden"); }
function hideSpinner() { spinner.classList.add("hidden"); }

// Load Categories
async function loadCategories() {
  showSpinner();
  const res = await fetch("https://openapi.programming-hero.com/api/categories");
  const data = await res.json();
  hideSpinner();

  data.categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "w-full p-2 bg-green-200 rounded hover:bg-green-300";
    btn.innerText = cat.category;
    btn.onclick = () => loadPlantsByCategory(cat.id, btn);
    categoryList.appendChild(btn);
  });
}

// Load Plants by Category
async function loadPlantsByCategory(id, btn) {
  showSpinner();
  document.querySelectorAll("#category-list button").forEach(b => {
    b.classList.remove("bg-green-500", "text-white");
  });
  btn.classList.add("bg-green-500", "text-white");

  const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
  const data = await res.json();
  hideSpinner();
  displayPlants(data.data);
}

// Display Plants as cards
function displayPlants(plants) {
  plantList.innerHTML = "";
  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow flex flex-col items-center text-center";

    card.innerHTML = `
      <img src="${plant.image}" class="h-32 w-full object-cover rounded mb-2" />
      <h3 class="text-lg font-bold cursor-pointer text-green-700 hover:underline">${plant.name}</h3>
      <p class="text-sm mb-1">${plant.description.slice(0,60)}...</p>
      <p class="text-green-600 font-semibold">Category: ${plant.category}</p>
      <p class="text-yellow-600 font-bold mb-2">Price: $${plant.price}</p>
      <button class="px-4 py-2 bg-yellow-400 text-green-700 rounded-full font-semibold hover:bg-yellow-500 transition">Add to Cart</button>
    `;

    card.querySelector("h3").onclick = () => showModal(plant.id);
    card.querySelector("button").onclick = () => addToCart(plant);

    plantList.appendChild(card);
  });
}

// Modal
async function showModal(id) {
  showSpinner();
  const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  const data = await res.json();
  hideSpinner();

  const plant = data.data;
  document.getElementById("modal-title").innerText = plant.name;
  document.getElementById("modal-img").src = plant.image;
  document.getElementById("modal-desc").innerText = plant.description;
  document.getElementById("modal-price").innerText = `Price: $${plant.price}`;
  modal.classList.remove("hidden");
}

document.getElementById("close-modal").onclick = () => modal.classList.add("hidden");

// Cart
function addToCart(plant) {
  cart.push(plant);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index,1);
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item,index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-white p-2 rounded";
    li.innerHTML = `${item.name} - $${item.price} <button class="text-red-500">❌</button>`;
    li.querySelector("button").onclick = () => removeFromCart(index);
    cartList.appendChild(li);
  });
  cartTotal.innerText = total.toFixed(2);
}

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.onclick = () => menu.classList.toggle("hidden");

// Initial Load
loadCategories();