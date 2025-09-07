// ==================================================
// Header Area
// ==================================================
// -------------------------> Hamburger Button <-------------------------
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

hamburgerBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden');
});
