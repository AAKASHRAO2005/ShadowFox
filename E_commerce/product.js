const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const item = products.find(p => p.id == id);
const cartKey = "mystore-cart";
const wishlistKey = "mystore-wishlist";

document.getElementById("productDetails").innerHTML = `
  <div class="product-detail">
    
    <!-- LEFT SIDE IMAGE SECTION -->
    <div class="left">
      <div class="main-img-container">
        <img src="${item.image}" id="mainImage" class="detail-img">
      </div>
      <div class="thumbs">
        <img src="${item.image}" onclick="changeImage('${item.image}')" class="active-thumb">
        <img src="${item.image}" onclick="changeImage('${item.image}')">
        <img src="${item.image}" onclick="changeImage('${item.image}')">
      </div>
    </div>

    <!-- RIGHT SIDE DETAILS -->
    <div class="right">
      <h2 class="title">${item.name}</h2>
      <p class="brand">Brand: <span>${item.brand}</span></p>
      
      <div class="price-box">
        <span class="price">₹${item.price}</span>
        <span class="discount">10% OFF</span>
      </div>

      <div class="delivery-box">
        <input id="pincode" class="input" placeholder="Enter Delivery Pincode">
        <button onclick="checkPincode()" class="btn small">Check</button>
        <p id="deliveryMsg" class="delivery-msg"></p>
      </div>

      <div class="actions">
        <button onclick="addToCart(${item.id})" class="btn cart-btn big">Add to Cart 🛒</button>
        <button onclick="addToWishlist(${item.id})" class="btn wishlist-btn big">Wishlist ❤️</button>
      </div>

      <div class="reviews-box">
        <h3>Ratings & Reviews</h3>
        <div class="rating-stars">⭐⭐⭐⭐☆ <span>(4.0/5)</span></div>
        <p class="review">“Great quality product, totally worth it!” — User123</p>
      </div>
    </div>

  </div>
`;


function checkPincode() {
  const pin = document.getElementById("pincode").value;
  const msg = document.getElementById("deliveryMsg");

  if (pin.length === 6) {
    msg.innerText = "Delivery available in 4–6 days.";
    msg.style.color = "green";
  } else {
    msg.innerText = "Invalid pincode.";
    msg.style.color = "red";
  }
}
function changeImage(src) {
  document.getElementById("mainImage").src = src;

  const thumbs = document.querySelectorAll(".thumbs img");
  thumbs.forEach(t => t.classList.remove("active-thumb"));
  event.target.classList.add("active-thumb");
}


function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.push(product);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Added to cart!");
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  if (!wishlist.some(p => p.id === id)) {
    wishlist.push(product);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    alert("Added to wishlist!");
  } else {
    alert("Already in wishlist!");
  }
}
