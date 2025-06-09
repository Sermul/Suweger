document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
      });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // Dropdown Profile
  const profileBtn = document.getElementById('profileBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener('click', function () {
      dropdownMenu.classList.toggle('hidden');
    });

    // Tutup dropdown saat klik di luar
    document.addEventListener('click', function (event) {
      if (!dropdownMenu.contains(event.target) && !profileBtn.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
      }
    });
  }
});