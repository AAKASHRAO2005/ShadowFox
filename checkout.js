const cartKey = "mystore-cart";
const ordersKey = "orders";

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
const summary = document.getElementById("summary");

// CALCULATE BILL
let subtotal = 0;
cart.forEach(item => {
  const qty = item.qty || 1;
  subtotal += item.price * qty;
});

// CHARGES
let gst = subtotal * 0.18;
let delivery = subtotal > 1000 ? 0 : 59;
let total = subtotal + gst + delivery;

// SHOW SUMMARY ON PAGE
summary.innerHTML = `
  <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
  <p>GST (18%): ₹${gst.toFixed(2)}</p>
  <p>Delivery: ₹${delivery}</p>
  <h3>Total Amount: ₹${total.toFixed(2)}</h3>
`;

function placeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const pin = document.getElementById("pincode").value;
  const payment = document.querySelector("input[name='pay']:checked").value;

  if (!name || !phone || !address || !city || !pin) {
    alert("Please fill all address fields!");
    return;
  }

  const orderId = generateOrderID();

  // SAVE ORDER HISTORY
  let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

  orders.push({
    id: orderId,
    date: new Date().toLocaleString(),
    items: cart,
    bill: { subtotal, gst, delivery, total },
    customer: { name, phone, address, city, pin },
    payment
  });

  localStorage.setItem(ordersKey, JSON.stringify(orders));

  // CLEAR CART
  localStorage.removeItem(cartKey);

  alert(`Order Placed!\nOrder ID: ${orderId}\nPayment: ${payment}`);

  window.location.href = "index.html";
}

function generateOrderID() {
  return "ORD" + Math.floor(Math.random() * 900000 + 100000);
}

document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);