// Carousel Logic
const carousel = document.getElementById('carousel');
const items = document.querySelectorAll('.carousel-item');

function updatePosition() {
  const centerX = window.innerWidth / 2;
  let closestItem = null;
  let minDistance = Infinity;

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = Math.abs(centerX - itemCenter);
    const progress = Math.min(distance / centerX, 1);
    const curveY = Math.sqrt(1 - progress ** 2) * 100;

    item.style.transform = `translateY(${100 - curveY}px) scale(${1 - progress * 0.2})`;
    item.style.opacity = `${1 - progress * 0.4}`;

    if (distance < minDistance) {
      minDistance = distance;
      closestItem = item;
    }
  });

  if (closestItem) {
    const newColor = closestItem.getAttribute("data-bg");
    document.body.style.backgroundColor = newColor;
  }
}

carousel.addEventListener('scroll', () => {
  requestAnimationFrame(updatePosition);
});

window.addEventListener('resize', updatePosition);
window.addEventListener('load', updatePosition);

// Dropdown Logic
const profileBtn = document.getElementById("profileBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

profileBtn.addEventListener("click", (e) => {
  dropdownMenu.classList.toggle("show");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (!dropdownMenu.contains(e.target) && !profileBtn.contains(e.target)) {
    dropdownMenu.classList.remove("show");
  }
});

  function filterKategori(id) {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }



  // untuk komentar 
  const testimonials = document.querySelectorAll('.testimonial');
  const testimonialWrapper = document.querySelector('.testimonial-wrapper');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let currentIndex = 0;
  
  // Fungsi untuk menampilkan testimonial berdasarkan index
  function showTestimonial(index) {
    // Menggeser testimonial wrapper menggunakan transform
    testimonialWrapper.style.transform = `translateX(-${index * 100}%)`;
  }
  
  // Menangani klik pada tombol panah kiri
  leftArrow.addEventListener('click', () => {
    // Geser testimonial ke kiri
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });
  
  // Menangani klik pada tombol panah kanan
  rightArrow.addEventListener('click', () => {
    // Geser testimonial ke kanan
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });
  
  // Inisialisasi pertama untuk menampilkan testimonial pertama
  showTestimonial(currentIndex);
  



// Ganti bagian show target content dengan:
if (target === 'artikel') {
  document.getElementById('contentArea').innerHTML = `
    <iframe src="pages/artikel.html" frameborder="0" class="w-full h-full min-h-screen"></iframe>
  `;
} else if (target === 'produk') {
  // sama untuk menu lainnya
}

 // Dropdown toggle
document.getElementById("profileBtn").addEventListener("click", function () {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("show");
});

// Menutup dropdown ketika klik di luar
window.onclick = function (event) {
  if (!event.target.matches(".profile-img")) {
    const dropdown = document.getElementById("dropdownMenu");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
};


document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.drink-slider');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');

    if (slider && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            slider.scrollLeft -= 300;
        });

        rightArrow.addEventListener('click', () => {
            slider.scrollLeft += 300;
        });
    } else {
        console.error("Slider or arrows not found in the DOM.");
    }
});

// keranjang
// Cart Data
let cartItems = [
  {
    id: 1,
    name: "Boba Classic",
    description: "Minuman segar dengan boba original",
    price: 22000,
    quantity: 1,
    image: "image/kopyor1.webp"
  },
  {
    id: 2,
    name: "Boba Matcha",
    description: "Minuman matcha premium dengan boba",
    price: 24000,
    quantity: 2,
    image: "image/kopyor2.webp"
  }
];

// DOM Elements
const cartContainer = document.getElementById('cart-container');
const emptyCart = document.getElementById('empty-cart');
const orderSummary = document.getElementById('order-summary');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    maximumFractionDigits: 0 
  }).format(amount);
};

// Calculate totals
const calculateTotals = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10000;
  const total = subtotal + shipping;
  
  subtotalEl.textContent = formatCurrency(subtotal);
  shippingEl.textContent = formatCurrency(shipping);
  totalEl.textContent = formatCurrency(total);
};

// Render cart items
const renderCartItems = () => {
  cartContainer.innerHTML = '';
  
  if (cartItems.length === 0) {
    emptyCart.classList.remove('hidden');
    orderSummary.classList.add('hidden');
    return;
  }
  
  emptyCart.classList.add('hidden');
  orderSummary.classList.remove('hidden');
  
  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="item-info">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">${formatCurrency(item.price)}</p>
        </div>
      </div>
      <div class="item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn decrease-btn" data-id="${item.id}">
            <i class="fas fa-minus"></i>
          </button>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}" />
          <button class="quantity-btn increase-btn" data-id="${item.id}">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <p class="item-total">${formatCurrency(itemTotal)}</p>
        <button class="remove-btn" data-id="${item.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
    
    cartContainer.appendChild(itemEl);
  });
  
  // Add event listeners to new elements
  addEventListeners();
  calculateTotals();
};

// Add event listeners
const addEventListeners = () => {
  // Decrease quantity
  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').getAttribute('data-id'));
      const item = cartItems.find(item => item.id === id);
      if (item.quantity > 1) {
        item.quantity--;
        renderCartItems();
      }
    });
  });
  
  // Increase quantity
  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').getAttribute('data-id'));
      const item = cartItems.find(item => item.id === id);
      item.quantity++;
      renderCartItems();
    });
  });
  
  // Manual quantity input
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const item = cartItems.find(item => item.id === id);
      const newQuantity = parseInt(e.target.value);
      if (newQuantity >= 1) {
        item.quantity = newQuantity;
        renderCartItems();
      } else {
        e.target.value = item.quantity;
      }
    });
  });
  
  // Remove item
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('button').getAttribute('data-id'));
      cartItems = cartItems.filter(item => item.id !== id);
      renderCartItems();
    });
  });
};

// Profile dropdown functionality
document.getElementById('profileBtn').addEventListener('click', function() {
  document.getElementById('dropdownMenu').style.display = 
    document.getElementById('dropdownMenu').style.display === 'block' ? 'none' : 'block';
});

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
  if (!e.target.matches('#profileBtn') && !e.target.matches('.dropdown-content a')) {
    document.getElementById('dropdownMenu').style.display = 'none';
  }
});

// Mark active menu item
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Initialize cart
  renderCartItems();
});



// KERANJANG TERBARU
// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const emptyCart = document.getElementById('empty-cart');
    const orderSummary = document.getElementById('order-summary');

    // Profile dropdown toggle
    document.getElementById('profileBtn').addEventListener('click', function() {
        document.getElementById('dropdownMenu').classList.toggle('show');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function(e) {
        if (!e.target.matches('#profileBtn') && !e.target.closest('.profile-container')) {
            const dropdown = document.getElementById('dropdownMenu');
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

    // Display cart items
    function displayCartItems() {
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            emptyCart.style.display = 'flex';
            orderSummary.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        orderSummary.style.display = 'block';

        // Create cart header
        const cartHeader = document.createElement('div');
        cartHeader.className = 'cart-header';
        cartHeader.innerHTML = `
            <h2>Produk Anda (${cart.length})</h2>
            <label class="select-all">
                <input type="checkbox" id="selectAll"> Pilih Semua
            </label>
        `;
        cartContainer.appendChild(cartHeader);

        // Add each cart item
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <input type="checkbox" class="item-checkbox" checked data-index="${index}">
                <img src="${item.image || 'image/placeholder-product.jpg'}" alt="${item.name}" class="item-img">
                <div class="item-details">
                    <h3 class="item-title">${item.name}</h3>
                    ${item.customization ? `
                        <div class="customization-details">
                            <p>Ukuran: ${item.customization.size === 'large' ? 'Large (+Rp 5.000)' : 'Regular'}</p>
                            <p>Gula: ${getSugarLabel(item.customization.sugarLevel)}</p>
                            <p>Es: ${getIceLabel(item.customization.iceLevel)}</p>
                            ${item.customization.toppings.length > 0 ? `
                                <p>Topping: ${item.customization.toppings.map(t => getToppingLabel(t)).join(', ')}</p>
                            ` : ''}
                            ${item.customization.specialNotes ? `
                                <p>Catatan: ${item.customization.specialNotes}</p>
                            ` : ''}
                        </div>
                    ` : ''}
                    <p class="item-price">Rp ${item.totalPrice.toLocaleString('id-ID')}</p>
                </div>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Add event listeners
        addCartEventListeners();
        updateOrderSummary();
    }

    // Helper functions for labels
    function getSugarLabel(level) {
        const labels = {
            'normal': 'Normal',
            'less': 'Kurang',
            'no': 'Tanpa Gula'
        };
        return labels[level] || level;
    }

    function getIceLabel(level) {
        const labels = {
            'normal': 'Normal',
            'less': 'Kurang',
            'no': 'Tanpa Es'
        };
        return labels[level] || level;
    }

    function getToppingLabel(topping) {
        const labels = {
            'pearl': 'Bubble Pearl (+Rp 3.000)',
            'jelly': 'Coconut Jelly (+Rp 3.000)',
            'pudding': 'Pudding (+Rp 4.000)'
        };
        return labels[topping] || topping;
    }

    // Add event listeners for cart interactions
    function addCartEventListeners() {
        // Quantity controls
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const input = this.closest('.quantity-control').querySelector('.quantity-input');
                let value = parseInt(input.value);
                
                if (this.classList.contains('minus') && value > 1) {
                    value--;
                } else if (this.classList.contains('plus') && value < 99) {
                    value++;
                }
                
                input.value = value;
                cart[index].quantity = value;
                cart[index].totalPrice = (cart[index].basePrice + (cart[index].customization?.additionalPrice || 0)) * value;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateOrderSummary();
            });
        });

        // Remove item
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
            });
        });

        // Select/Deselect all items
        document.getElementById('selectAll').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateOrderSummary();
        });

        // Individual item selection
        document.querySelectorAll('.item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectAllCheckbox();
                updateOrderSummary();
            });
        });
    }

    // Update "Select All" checkbox state
    function updateSelectAllCheckbox() {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        const selectAll = document.getElementById('selectAll');
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        
        selectAll.checked = allChecked;
    }

    // Update order summary
    function updateOrderSummary() {
        let subtotal = 0;
        let itemCount = 0;
        
        document.querySelectorAll('.cart-item').forEach((item, index) => {
            const checkbox = item.querySelector('.item-checkbox');
            if (checkbox.checked) {
                subtotal += cart[index].totalPrice;
                itemCount += cart[index].quantity;
            }
        });
        
        const shipping = itemCount > 0 ? 10000 : 0;
        const total = subtotal + shipping;
        
        document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        document.getElementById('shipping').textContent = `Rp ${shipping.toLocaleString('id-ID')}`;
        document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
        
        // Update item count in summary
        const itemText = itemCount === 1 ? '1 item' : `${itemCount} items`;
        document.querySelector('.summary-row span:first-child').textContent = `Subtotal (${itemText})`;
    }

    // Initialize
    displayCartItems();
});

// KERANJANG
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  const emptyCart = document.getElementById('empty-cart');
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');

  // Load cart from localStorage or initialize empty
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartDisplay() {
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
      emptyCart.style.display = 'block';
      cartContainer.style.display = 'none';
    } else {
      emptyCart.style.display = 'none';
      cartContainer.style.display = 'block';
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p>Rp ${item.price.toLocaleString()}</p>
            <div class="quantity-control">
              <button onclick="updateQuantity(${item.id}, -1)">-</button>
              <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
              <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="options">
              <select onchange="updateOption(${item.id}, 'sugar', this.value)">
                <option value="Normal Sugar" ${item.sugar === 'Normal Sugar' ? 'selected' : ''}>Normal Sugar</option>
                <option value="Less Sugar" ${item.sugar === 'Less Sugar' ? 'selected' : ''}>Less Sugar</option>
              </select>
              <select onchange="updateOption(${item.id}, 'ice', this.value)">
                <option value="Normal Ice" ${item.ice === 'Normal Ice' ? 'selected' : ''}>Normal Ice</option>
                <option value="Less Ice" ${item.ice === 'Less Ice' ? 'selected' : ''}>Less Ice</option>
              </select>
            </div>
          </div>
          <button class="remove-btn" onclick="removeItem(${item.id})">Hapus</button>
        `;
        cartContainer.appendChild(cartItem);
      });
    }
    updateSummary();
  }

  window.updateQuantity = (id, change) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      if (typeof change === 'string') {
        change = parseInt(change);
      }
      if (typeof change === 'number') {
        item.quantity = Math.max(1, item.quantity + change);
      } else {
        item.quantity = Math.max(1, change);
      }
      saveCart();
      updateCartDisplay();
    }
  };

  window.updateOption = (id, option, value) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      item[option] = value;
      saveCart();
      updateCartDisplay();
    }
  };

  window.removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
  };

  function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cart.length > 0 ? 10000 : 0;
    const total = subtotal + shipping;
    subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
    shippingElement.textContent = `Rp ${shipping.toLocaleString()}`;
    totalElement.textContent = `Rp ${total.toLocaleString()}`;
  }

  // Sample function to add items (to be called from katalog_produk.html)
  window.addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        quantity: 1,
        sugar: 'Normal Sugar',
        ice: 'Normal Ice'
      });
    }
    saveCart();
    updateCartDisplay();
  };

  updateCartDisplay();
});

// humburger terbaru
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




//chatbot
function toggleChat() {
  const chat = document.getElementById('chatbot');
  chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function respond(type) {
  const body = document.getElementById('chat-body');
  let message = '';
  if (type === 'promo') {
    message = 'Promo hari ini: Diskon 20% untuk produk tertentu. Cek banner utama ya!';
  } else if (type === 'pengiriman') {
    message = 'Kami kirim dalam 1–3 hari kerja, tergantung lokasi kamu.';
  } else if (type === 'hubungi') {
    message =
    'Hubungi admin via WhatsApp: 0812-XXXX-XXXX';

  }

  const reply = document.createElement('div');
  reply.className = 'bot-message';
  reply.innerText = message;
  body.appendChild(reply);
  body.scrollTop = body.scrollHeight;
}