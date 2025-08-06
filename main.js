// Product List
const products = [
  {
    id: 1,
    name: 'OPPO F29 Pro',
    description: 'Oppo F29 Pro Android smartphone...',
    price: 15000,
    image: 'smartphone.png',
  },
  {
    id: 2,
    name: 'ASUS VIVOBOOK 15',
    description: 'The Asus VivoBook 15 is a versatile laptop...',
    price: 45000,
    image: 'laptop.avif',
  },
  {
    id: 3,
    name: 'SONY HEADPHONES',
    description: 'From airplane noise to people’s voices...',
    price: 5500,
    image: 'Headphones.avif',
  },
  {
    id: 4,
    name: 'BOULT DRIFT SMARTWATCH',
    description: 'Comprehensive Health Monitoring...',
    price: 1500,
    image: 'smartwatch.jpg',
  },
];

// Render product list (on homepage)
const productsContainer = document.getElementById('products');
if (productsContainer) {
  products.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} INR</p>
        <a href="product.html?id=${product.id}">View Details</a>
      </div>
    `;
    productsContainer.innerHTML += productCard;
  });
}

// Load product detail (on product.html)
const productDetails = window.location.search;
if (productDetails.includes('?id=')) {
  const id = new URLSearchParams(productDetails).get('id');
  const product = products.find(p => p.id == id);
  if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-description').innerText = product.description;
    document.getElementById('product-price').innerText = `₹${product.price}`;

    // Attach product data to "Add to Cart" button
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
      addToCart(product);
    });
  }
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  const itemIndex = cart.findIndex(item => item.id === product.id);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart`);
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;

  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  if (storedCart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItemsContainer.innerHTML = '';
  let total = 0;

  storedCart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div class="cart-item-actions">
        <p>Total: ₹${itemTotal}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'cart-total';
  totalDiv.innerHTML = `<h3>Grand Total: ₹${total}</h3>`;
  cartItemsContainer.appendChild(totalDiv);
}

// Function to remove item from cart
function removeFromCart(productId) {
  let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = storedCart.findIndex(item => item.id === productId);

  if (itemIndex > -1) {
    storedCart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(storedCart));
    renderCart();
  }
}

// Checkout
function checkout() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  if (storedCart.length === 0) {
    alert("Your cart is empty. Add items before checking out.");
    return;
  }

  let total = 0;
  storedCart.forEach(item => {
    total += item.price * item.quantity;
  });

  const confirmed = confirm(`Your total is ₹${total}. Proceed to checkout?`);

  if (confirmed) {
    alert("Thank you for your purchase!");
    localStorage.removeItem('cart');
    location.reload();
  }
}

// Load cart on cart.html
window.onload = renderCart;