// --------------------------------------------------
// API Config & Helper Area
// --------------------------------------------------
// Base URL
const BASE_URL = 'https://openapi.programming-hero.com/api';
// Generic Fetch Helper
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ API Error:', error.message);
    throw error;
  }
};

// -------------------------> API Endpoint Functions <-------------------------
// Get All Category
const getAllCategories = async () => await fetchData('/categories');
// Get All Plants
const getAllPlants = async () => await fetchData('/plants');
// Get Plants By Categories
const getPlantsByCategory = async (id) => await fetchData(`/category/${id}`);
// Get Plant Detail
const getPlantDetail = async (id) => await fetchData(`/plant/${id}`);

// --------------------------------------------------
// Header Area
// --------------------------------------------------
// -------------------------> Hamburger Button <-------------------------
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

hamburgerBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});

// --------------------------------------------------
// Main Area
// --------------------------------------------------
// -------------------------> Data Implementation from API on the Trees Section <-------------------------
// Categories Load
const loadCategories = async () => {
  try {
    const categories = await getAllCategories();
    renderCategories(categories);
  } catch (error) {
    console.log('Could not load categories: ', error.message);
  }
};

// All Plants Load
const loadAllPlants = async () => {
  try {
    const plants = await getAllPlants();
    renderPlants(plants);
  } catch (error) {
    console.log('Could not load plants: ', error.message);
  }
};

// Plants Load By Category
const loadPlantsByCategory = async (id) => {
  try {
    const plants = await getPlantsByCategory(id);
    renderPlants(plants);
  } catch (error) {
    console.log('Could not load plants: ', error.message);
  }
};

// Plants Detail Load
const loadPlantDetail = async (id) => {
  try {
    const details = await getPlantDetail(id);
    renderPlantByDetail(details);
  } catch (error) {
    console.log('Could not load details: ', error.message);
  }
};

// Categories Rendering
const renderCategories = (categories) => {
  const categoriesContainer = document.getElementById('categoriesContainer');
  // categoriesContainer.innerHTML = '';

  const allCategory = categories.categories;
  // console.log(allCategory);

  // Default Category Button
  const defaultBtn = categoriesContainer.querySelector('button');
  // Focus Function
  defaultBtn.addEventListener('click', (e) => {
    const allBtns = categoriesContainer.querySelectorAll('button');
    allBtns.forEach((btn) => btn.classList.remove('focus'));
    defaultBtn.classList.add('focus');

    loadAllPlants();
  });

  // API Category Button
  allCategory.forEach((category) => {
    const li = document.createElement('li');
    // li.classList.add('focus');
    li.innerHTML = `<li>
    <button
      class="hover:bg-[#15803D] hover:text-white w-full text-left px-2 py-1 rounded-sm cursor-pointer"
    >
      ${category.category_name}
    </button>
  </li>`;

    const btn = li.querySelector('button');

    btn.addEventListener('click', (e) => {
      const allBtns = categoriesContainer.querySelectorAll('button');
      // Focus Function
      allBtns.forEach((btn) => {
        btn.classList.remove('focus');
      });
      btn.classList.add('focus');

      loadPlantsByCategory(category.id);
    });

    categoriesContainer.appendChild(li);
  });
};

// Plants Rendering
const renderPlants = (plants) => {
  const plantsContainer = document.getElementById('plantsContainer');
  plantsContainer.innerHTML = '';

  const allPlants = plants.plants;

  allPlants.forEach((plant) => {
    const div = document.createElement('div');
    div.className =
      'bg-white h-full shadow-md rounded-xl p-3 space-y-5 transition-all duration-400 hover:scale-102 hover:shadow-[0_3px_10px_rgba(0,0,0,0.2)] hover:bg-gradient-to-b hover:from-[#F0FDF4] hover:to-[#DCFCE7]';
    div.innerHTML = `
      <div class="space-y-2.5">
        <!-- Image -->
        <div class="xl:h-[250px] 2xl:h-[300px] flex justify-center items-center bg-[gray]/30 rounded-md overflow-hidden relative">
          <!-- Image Skeleton -->
          <div class="absolute inset-0 skeleton h-1/2 w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          <!-- Image -->
          <img
            class="h-full w-full hidden"
            src="${plant.image}"
            alt="${plant.name}"
            onload="this.previousElementSibling.classList.add('hidden'); this.classList.remove('hidden');"
          />
        </div>

        <!-- Image Details -->
        <div class="space-y-1.5">
          <div class="space-y-1">
            <h5 
              class="plant-name font-semibold xl:text-sm 2xl:text-base cursor-pointer text-green-700 hover:underline"
              data-id="${plant.id}"
            >
              ${plant.name}
            </h5>
            <p class="lg:text-[14px] xl:text-xs 2xl:text-sm">
              ${plant.description}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm bg-[#DCFCE7] px-4 py-1 rounded-full">
              <i class="fa-solid fa-tag"></i> ${plant.category}
            </span>
            <span class="font-semibold">৳${plant.price}</span>
          </div>
        </div>
      </div>

      <div>
        <button
          class="add-to-cart-btn w-full bg-[#15803D] text-white px-[18px] sm:px-[10px] md:px-[8px] lg:px-[8px] xl:px-[12px] 2xl:px-[14px] py-[4px] sm:py-[3px] md:py-[4px] lg:py-[3px] xl:py-[4px] 2xl:py-[8px] rounded-full hover:shadow-[0_4px_10px_rgba(0,0,0,0.25)] active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.4),inset_-2px_-2px_6px_rgba(255,255,255,0.2)] transition-all duration-200 shadow-[0_3px_6px_rgba(0,0,0,0.15)] active:-translate-y-1 overflow-hidden cursor-pointer"
          data-id="${plant.id}"
        >
          Add to Cart
        </button>
      </div>
    `;

    plantsContainer.appendChild(div);
  });

  // Global Event Listener for Add to Cart Button
  const addToCartBtn = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtn.forEach((cartEl) => {
    cartEl.addEventListener('click', async (e) => {
      const id = e.currentTarget.dataset.id;
      try {
        console.log('Add to Cart Clicked for Plant ID:', id);
        const details = await getPlantDetail(id);
        console.log('Plant Details:', details);
        showToastForConfirmation(details);
      } catch (error) {
        console.error('Plant details load error:', error);
      }
    });
  });

  // Global Event Listener for Plant Details
  const plantNames = document.querySelectorAll('.plant-name');
  plantNames.forEach((nameEl) => {
    nameEl.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      try {
        const details = await getPlantDetail(id);
        renderPlantByDetail(details);
        document.getElementById('plantModal').showModal();
      } catch (error) {
        console.error('Plant details load error:', error);
      }
    });
  });
};

// Plant Detail Rendering
const renderPlantByDetail = (details) => {
  const detail = details.plants;
  const modalContent = document.getElementById('plantModalContent');

  if (!modalContent) {
    console.error('Modal content container not found');
    return;
  }

  modalContent.innerHTML = `
    <div class="mb-4">
      <h3 class="text-2xl font-extrabold">${detail.name}</h3>
    </div>
    <div class="mb-4">
      <img src="${detail.image}" alt="${detail.name}" class="w-full h-60 object-cover rounded-md" />
    </div>
    <div class="mb-3">
      <span class="text-lg font-semibold">Category: </span>
      <span class="text-lg font-medium">${detail.category}</span>
    </div>
    <div class="mb-4">
      <span class="text-lg font-semibold">Price: </span>
      <span class="text-lg font-medium text-green-600">৳${detail.price}</span>
    </div>
    <div>
      <h5 class="text-lg font-semibold mb-3">Description</h5>
      <p class="text-lg font-medium">${detail.description}</p>
    </div>
  `;
};

// --------------------------------------------------
// Cart Management System with Toast
// --------------------------------------------------
let cart = [];

const addToCart = async (plantDetails) => {
  const plant = plantDetails.plants;

  const existingItem = cart.find((item) => item.id === plant.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: plant.id,
      name: plant.name,
      price: parseFloat(plant.price),
      quantity: 1,
    });
  }

  renderCartUI();
};

// ---------------- RENDER CART ----------------
const renderCartUI = () => {
  const cartContainer = document.getElementById('cartContainer');
  const totalAmountEl = document.getElementById('totalAmount');
  if (!cartContainer || !totalAmountEl) return;

  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    const div = document.createElement('div');
    div.className =
      'cart-item flex justify-between items-center rounded-md px-3 py-2 bg-[#F0FDF4] shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg cursor-pointer';

    div.innerHTML = `
      <div>
        <h5 class="text-sm font-medium">${item.name}</h5>
        <span class="text-xs">৳${item.price.toFixed(2)} × ${
      item.quantity
    }</span>
      </div>
      <div>
        <i
          class="fa-solid fa-trash-can hover:text-[red]"
          title="Remove Item"
          data-id="${item.id}"
        ></i>
      </div>
    `;

    cartContainer.prepend(div);

    // Delete Button Event
    const deleteBtn = div.querySelector('.fa-trash-can');
    deleteBtn.addEventListener('click', () => {
      cart = cart.filter((cartItem) => cartItem.id !== item.id);
      renderCartUI();
    });

    total += item.price * item.quantity;
  });

  totalAmountEl.innerText = `৳ ${total.toFixed(2)}`;
};

// ---------------- SHOW TOAST FOR CONFIRMATION ----------------
const showToastForConfirmation = (plantDetails) => {
  const plant = plantDetails.plants;
  const toastContainer = document.getElementById('toastContainer');

  const toast = document.createElement('div');
  toast.className =
    'flex flex-col gap-5 px-[50px] bg-white border rounded-lg shadow-lg px-4 py-3 flex justify-between items-center transform translate-y-[-120%] opacity-0 transition-all duration-500';

  toast.innerHTML = `
    <div>
      <p class="text-sm font-semibold">${plant.name}</p>
      <p class="text-xs text-gray-600">৳ ${plant.price}</p>
    </div>
    <div class="w-full flex justify-between items-center">
      <button class="ok-btn px-2 py-1 bg-green-500 text-white text-xs rounded">OK</button>
      <button class="cancel-btn px-2 py-1 bg-red-500 text-white text-xs rounded">Cancel</button>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Animate In
  setTimeout(() => {
    toast.classList.remove('translate-y-[-120%]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  // OK Button → add to cart and remove toast
  toast.querySelector('.ok-btn').addEventListener('click', () => {
    addToCart(plantDetails);
    hideToast(toast);
  });

  // Cancel Button → just remove toast
  toast.querySelector('.cancel-btn').addEventListener('click', () => {
    hideToast(toast);
  });
};

// ---------------- HIDE TOAST ----------------
const hideToast = (toast) => {
  toast.classList.remove('translate-y-0', 'opacity-100');
  toast.classList.add('translate-y-[-120%]', 'opacity-0');

  setTimeout(() => {
    toast.remove();
  }, 500); // wait for animation
};

// ---------------- CART BUTTON EVENTS ----------------
const bindCartButtons = () => {
  document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.dataset.id;
      try {
        const details = await getPlantDetail(id);
        showToastForConfirmation(details);
      } catch (error) {
        console.error('Plant details load error:', error);
      }
    });
  });
};

// ---------------- INIT ----------------
bindCartButtons();

loadCategories();
loadAllPlants();
