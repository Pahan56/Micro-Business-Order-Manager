const API_URL = "/api/orders";

export async function getOrders() {
  const response = await fetch(API_URL);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to load orders");
  }
  return result.data;
}

export async function createOrder(order) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to create order");
  }
  return result.data;
}

export async function updateOrder(id, order) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update order");
  }
  return result.data;
}

export async function deleteOrder(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to delete order");
  }
  return result;
}
