const productList = document.getElementById("productList");
const cartKey = "mystore-cart";
const wishlistKey = "mystore-wishlist";

function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(item => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${item.image}" onclick="openProduct(${item.id})" class="clickable">
        <h4>${item.name}</h4>
        <p>${item.brand}</p>
        <strong>₹${item.price}</strong>

        <button onclick="addToCart(${item.id})">Add to Cart</button>
        <button onclick="addToWishlist(${item.id})">Wishlist ❤️</button>
      </div>
    `;
  });
}

displayProducts(products);

// Open product details page
function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const index = cart.findIndex(p => p.id === id);
  if (index > -1) {
    cart[index].qty += 1;
  } else {
    product.qty = 1;
    cart.push(product);
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

// Add to Wishlist
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

// FILTER + SORT + SEARCH
document.getElementById("brandFilter").onchange = applyControls;
document.getElementById("sortSelect").onchange = applyControls;
document.getElementById("searchBar").addEventListener("keyup", applyControls);

function applyControls() {
  let filtered = [...products];

  const search = searchBar.value.toLowerCase();
  const brand = brandFilter.value;
  const sort = sortSelect.value;

  if (search !== "") {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  if (brand !== "all") {
    filtered = filtered.filter(p => p.brand === brand);
  }

  if (sort === "lowToHigh") filtered.sort((a,b)=> a.price - b.price);
  if (sort === "highToLow") filtered.sort((a,b)=> b.price - a.price);

  displayProducts(filtered);
}
if (!cart.some(p => p.id === product.id)) {
  product.qty = 1;
  cart.push(product);
} else {
  const index = cart.findIndex(p => p.id === product.id);
  cart[index].qty++;
}
localStorage.setItem(cartKey, JSON.stringify(cart));
alert("Added to cart!");