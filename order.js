const ordersKey = "orders";
const orderList = document.getElementById("orderList");

let orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

function showOrders() {
  if (orders.length === 0) {
    orderList.innerHTML = "<h3>No Orders Yet!</h3>";
    return;
  }

  orders.forEach(order => {
    orderList.innerHTML += `
      <div class="order-card">

        <div class="order-header">
          <h3>Order ID: ${order.id}</h3>
          <p>Date: ${order.date}</p>
        </div>

        <div class="order-bill">
          <p><strong>Payment:</strong> ${order.payment}</p>
          <p><strong>Total:</strong> ₹${order.bill.total.toFixed(2)}</p>
        </div>

        <div class="order-address">
          <strong>Delivery Address:</strong>
          <p>${order.customer.name}, ${order.customer.phone}</p>
          <p>${order.customer.address}, ${order.customer.city} - ${order.customer.pin}</p>
        </div>

        <div class="order-items">
          <strong>Items:</strong>
          <ul>
            ${order.items.map(i => `<li>${i.name} (Qty: ${i.qty || 1}) - ₹${i.price*i.qty}</li>`).join("")}
          </ul>
        </div>

      </div>
    `;
  });
}

showOrders();
