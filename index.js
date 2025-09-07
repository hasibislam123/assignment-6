const CategoriyContainer = document.getElementById("Categoriy-Container");
const cardsection = document.getElementById("card-section");
const cartList = document.getElementById("cart-list");
const cartSection = document.getElementById("cart-section");
const modalContainer = document.getElementById("modalContainer");
const newsDetailsModal = document.getElementById("news-details-modal");

// ---------- Global Cart ----------
let cart = [];

// ---------- Load Categories ----------
const loadCategoriy = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categoris = data.categories;
      showCategory(categoris);
    })
    .catch((err) => console.log(err));
};

const showCategory = (categoris) => {
  CategoriyContainer.innerHTML = `<h1 class="mb-3 font-semibold text-[20px]">Categories</h1>`;
  categoris.forEach((cat) => {
    CategoriyContainer.innerHTML += `
      <li id="${cat.id}" class="hover:bg-[#15803d] cursor-pointer px-2 py-1 rounded">
        ${cat.category_name}
      </li>`;
  });

  CategoriyContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("#Categoriy-Container li");
    allLi.forEach((li) => li.classList.remove("bg-[#15803d]", "text-white"));

    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803d]", "text-white");
      localEarthCategory(e.target.id);
    }
  });
};

// ---------- Load Plants by Category ----------
const localEarthCategory = (categoryID) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${categoryID}`)
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      showCardSection(data.plants);
    })
    .catch((err) => console.log(err));
};

// ---------- Show Plant Cards ----------
const showCardSection = (plants) => {
  cardsection.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className =
      "bg-green-100 border p-2 rounded shadow mb-4 w-[243.33px] flex flex-col justify-between";

    card.innerHTML = `
      <div>
        <img src="${plant.image}" alt="${plant.plant_name}" class="w-full h-40 object-cover rounded"/>
      </div>
      <div class="p-2 flex-1">
        <h1 class="font-semibold text-[20px] mb-[2px] cursor-pointer text-green-700 hover:underline tree-name">
          ${plant.name}
        </h1>
        <p class="text-sm text-gray-700 mb-[2px]">${plant.description}</p>
        <div class="flex justify-between items-center mt-2">
          <button class="btn btn-sm bg-[#DCFCE7] rounded-3xl">${plant.category}</button>
          <h3 class="font-semibold">
            <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
          </h3>
        </div>
      </div>
      <button class="btn btn-success w-full mt-2 add-to-cart">Add to Cart</button>
    `;

    // Add to Cart Event
    card.querySelector(".add-to-cart").addEventListener("click", () => {
      addToCart(plant);
    });

    // ---------- Modal Event (Tree Name Click) ----------
    card.querySelector(".tree-name").addEventListener("click", () => {
      showPlantDetails(plant);
    });

    cardsection.appendChild(card);
  });
};

// ---------- Show Plant Details in Modal ----------
const showPlantDetails = (plant) => {
  modalContainer.innerHTML = `
    <img src="${plant.image}" alt="${plant.name}" class="w-full h-52 object-cover rounded mb-4"/>
    <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
    <p class="text-gray-700 mb-2">${plant.description}</p>
    <p><strong>Category:</strong> ${plant.category}</p>
    <p><strong>Price:</strong> ${plant.price} ৳</p>
  `;
  newsDetailsModal.showModal();
};

// ---------- Add to Cart ----------
const addToCart = (plant) => {
  cart.push(plant);
  updateCartUI();
};

// ---------- Remove From Cart ----------
const removeFromCart = (index) => {
  cart.splice(index, 1);
  updateCartUI();
};

// ---------- Update Cart UI ----------
const updateCartUI = () => {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center";

    li.innerHTML = `
      <span>${item.name} - ${item.price}৳</span>
      <button class="text-red-500 font-bold">❌</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartList.appendChild(li);
  });

  // Show total price
  let totalDiv = document.getElementById("cart-total");
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.id = "cart-total";
    totalDiv.className = "font-bold mt-2";
    cartSection.appendChild(totalDiv);
  }
  totalDiv.textContent = `Total: ${total} ৳`;
};

// ---------- Loading Spinner ----------
const showSpinner = () => {
  cardsection.innerHTML = `<div class="col-span-3 text-center py-10">
      <span class="loading loading-spinner loading-lg text-green-600"></span>
    </div>`;
};
const hideSpinner = () => {
  cardsection.innerHTML = "";
};
// loadAllPlants

const loadAllPlants = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      // if (data.status && data.data.length > 0) {
      //   showCardSection(data.data); 
      // } else {
      //   cardsection.innerHTML = "<p>No plants found!</p>";
      // }
      showCardSection(data);
      console.log(data)
    })
    .catch((err) => console.log(err));

};
// ---------- Load All Plants on Page Load ----------
window.addEventListener("DOMContentLoaded", () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      hideSpinner();
      // if (data.status && data.data.length > 0) {
      //   showCardSection(data.data); // ✅ ডিফল্ট সব গাছ দেখাবে
      // }
      showCardSection(data);
      console.log(data)
    })
    .catch((err) => console.log(err));
});

loadCategoriy();
loadAllPlants()