const wishlistKey = "mystore-wishlist";
const cartKey = "mystore-cart";
let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
const area = document.getElementById("wishlistArea");

function showWishlist() {
  area.innerHTML = "";

  if (wishlist.length === 0) {
    area.innerHTML = "<h3>No items in wishlist!</h3>";
    return;
  }

  wishlist.forEach(item => {
    area.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>

          <button onclick="moveToCart(${item.id})" class="btn cart-btn">Move to Cart</button>
          <button onclick="removeItem(${item.id})" class="btn wishlist-btn">Remove</button>
        </div>
      </div>
    `;
  });
}

function removeItem(id) {
  wishlist = wishlist.filter(p => p.id !== id);
  localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  showWishlist();
}

function moveToCart(id) {
  const item = wishlist.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.push(item);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  removeItem(id);
}

showWishlist();
