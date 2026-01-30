const cartKey = "mystore-cart";
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
const container = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

function renderCart() {
  container.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = "<h3>Your cart is empty!</h3>";
    totalPrice.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>

          <div class="qty-box">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <button onclick="removeItem(${index})" class="btn wishlist-btn">Remove</button>
        </div>
      </div>
    `;
  });

  localStorage.setItem(cartKey, JSON.stringify(cart));

  updateBill(subtotal);
}

function changeQty(index, value) {
  cart[index].qty += value;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function updateBill(subtotal) {
  let delivery = subtotal > 1000 ? 0 : 59;
  let gst = subtotal * 0.18;
  let total = subtotal + delivery + gst;

  totalPrice.innerHTML = `
    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
    <p>GST (18%): ₹${gst.toFixed(2)}</p>
    <p>Delivery: ₹${delivery}</p>
    <h3>Total: ₹${total.toFixed(2)}</h3>
  `;

  localStorage.setItem("bill-summary", JSON.stringify({
    subtotal,
    gst,
    delivery,
    total
  }));
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkoutBtn").onclick = () => {
  window.location.href = "checkout.html";
};

renderCart();
