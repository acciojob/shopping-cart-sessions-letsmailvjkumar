// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} <button 
	   class ="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  // Add product to cart
  cart.push(product);

  // Update session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render cart list
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initial render
renderProducts();
renderCart();

// Event listener for clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Event delegation for add to cart buttons
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id, 10);
    addToCart(productId);
  }
});

// Event delegation for remove from cart buttons
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.dataset.id, 10);
    removeFromCart(productId);
  }
});