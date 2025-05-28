const products = [
  { name: "Rice (5kg)", price: 12.99, image: "images/rice.jpeg" },
  { name: "Milk (1L)", price: 1.99, image: "https://source.unsplash.com/featured/?milk" },
  { name: "Bread", price: 2.49, image: "https://source.unsplash.com/featured/?bread" },
  { name: "Eggs (12)", price: 3.50, image: "https://source.unsplash.com/featured/?eggs" },
  { name: "Chicken Breast", price: 6.99, image: "https://source.unsplash.com/featured/?chicken" },
  { name: "Tomatoes (1kg)", price: 2.99, image: "https://source.unsplash.com/featured/?tomato" },
  { name: "Cereal", price: 4.25, image: "https://source.unsplash.com/featured/?cereal" },
  { name: "Butter", price: 2.75, image: "https://source.unsplash.com/featured/?butter" },
  { name: "Biscuits", price: 1.20, image: "https://source.unsplash.com/featured/?biscuits" },
  { name: "Juice", price: 3.00, image: "https://source.unsplash.com/featured/?juice" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.getElementById("productGrid");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");

function renderProducts(filter = "") {
  productGrid.innerHTML = "";
  products
    .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
}

function addToCart(index) {
  const existingItem = cart.find(item => item.name === products[index].name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...products[index], quantity: 1 });
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;
}

function openCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${(item.price * item.quantity).toFixed(2)}
      <div class="cart-item-controls">
        <button onclick="changeQuantity(${index}, -1)">−</button>
        ${item.quantity}
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">x</button>
      </div>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartModal.style.display = "flex";
}

function closeCart() {
  cartModal.style.display = "none";
}

function clearCart() {
  cart = [];
  saveCart();
  openCart();
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  openCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  openCart();
}

document.getElementById("cartButton").addEventListener("click", openCart);
searchInput.addEventListener("input", (e) => renderProducts(e.target.value));

// Initialize
renderProducts();
updateCartCount();
