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
const getPlantsByCategory = async () => await fetchData(`/category/${id}`);
// Get Plant Detail
const getPlantDetail = async () => await fetchData(`/plant/${id}`);

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

    console.log('All Categories: ', categories);
    console.log('Loading categories');

    renderCategories(categories);
  } catch (error) {
    console.log('Could not load categories: ', error.message);
  } finally {
    console.log('Loading finished');
  }
};

const renderCategories = (categories) => {
  const categoriesContainer = document.getElementById('categoriesContainer');
  // categoriesContainer.innerHTML = '';

  const allCategory = categories.categories;
  console.log(allCategory);

  // Default Button
  const defaultBtn = categoriesContainer.querySelector('button');
  defaultBtn.addEventListener('click', (e) => {
    const allBtns = categoriesContainer.querySelectorAll('button');
    allBtns.forEach((btn) => btn.classList.remove('focus'));
    defaultBtn.classList.add('focus');
  });

  // API Buttons
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

      allBtns.forEach((btn) => {
        btn.classList.remove('focus');
      });
      btn.classList.add('focus');
    });

    categoriesContainer.appendChild(li);

    // remove letter
    // li.addEventListener('click', (e) => {
    //   // console.log(li);
    //   const listBtn = li.firstElementChild.firstElementChild;
    //   console.log(listBtn);
    //   listBtn.classList.add('focus');
    // });
  });
  // remove letter
  // const focusedBtns = document.querySelectorAll('.focus');
  // console.log(focusedBtns);

  // focusedBtns.forEach((focusedBtn) => {
  //   console.log(focusedBtn);
  //   focusedBtn.classList.remove('focus');

  //   focusedBtn.addEventListener('click', (e) => {
  //     focusedBtn.classList.add('focus');
  //   });
  // });
};

// --------------------------------------------------
// Calling Initial Function
// --------------------------------------------------
loadCategories();
