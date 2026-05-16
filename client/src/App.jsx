import { useEffect, useState } from "react";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "./api";

const emptyForm = {
  customerName: "",
  productName: "",
  quantity: 1,
  deliveryDate: "",
  status: "Pending",
};

function StatusBadge({ status }) {
  const className =
    status === "Completed"
      ? "badge badge-completed"
      : status === "Cancelled"
        ? "badge badge-cancelled"
        : "badge badge-pending";

  return <span className={className}>{status}</span>;
}

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    completed: orders.filter((o) => o.status === "Completed").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
  };

  async function loadOrders() {
    try {
      setLoading(true);
      setError("");
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      setSubmitting(true);
      await createOrder({
        customerName: form.customerName,
        productName: form.productName,
        quantity: form.quantity,
        deliveryDate: form.deliveryDate,
        status: form.status,
      });
      setForm(emptyForm);
      setMessage("Order created successfully.");
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(order, newStatus) {
    setMessage("");
    setError("");

    try {
      await updateOrder(order._id, {
        customerName: order.customerName,
        productName: order.productName,
        quantity: order.quantity,
        deliveryDate: order.deliveryDate,
        status: newStatus,
      });
      setMessage("Order status updated.");
      await loadOrders();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      await deleteOrder(id);
      setMessage("Order deleted successfully.");
      await loadOrders();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <p className="brand-label">Business Dashboard</p>
            <h1>Order Manager</h1>
            <p className="subtitle">
              Track and manage customer orders in one place
            </p>
          </div>
          <button type="button" className="btn-secondary" onClick={loadOrders}>
            Refresh
          </button>
        </div>
      </header>

      <main className="main">
        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}
        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        <section className="stats-grid">
          <article className="stat-card">
            <p className="stat-label">Total Orders</p>
            <p className="stat-value">{stats.total}</p>
          </article>
          <article className="stat-card stat-pending">
            <p className="stat-label">Pending</p>
            <p className="stat-value">{stats.pending}</p>
          </article>
          <article className="stat-card stat-completed">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{stats.completed}</p>
          </article>
          <article className="stat-card stat-cancelled">
            <p className="stat-label">Cancelled</p>
            <p className="stat-value">{stats.cancelled}</p>
          </article>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Create New Order</h2>
            <p>Fill in the details below to add a new order</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <label>
                Customer Name
                <input
                  type="text"
                  name="customerName"
                  placeholder="e.g. John Smith"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Product Name
                <input
                  type="text"
                  name="productName"
                  placeholder="e.g. Custom Cake"
                  value={form.productName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Quantity
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Delivery Date
                <input
                  type="date"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="full-width">
                Status
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : "+ Add Order"}
            </button>
          </form>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Orders List</h2>
            <p>{stats.total} order{stats.total !== 1 ? "s" : ""} total</p>
          </div>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading orders...</p>
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="empty-state">
              <p className="empty-title">No orders yet</p>
              <p>Create your first order using the form above.</p>
            </div>
          )}

          {!loading && orders.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="customer-cell">{order.customerName}</td>
                      <td>{order.productName}</td>
                      <td>{order.quantity}</td>
                      <td>
                        {order.deliveryDate
                          ? new Date(order.deliveryDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "-"}
                      </td>
                      <td>
                        <div className="status-cell">
                          <StatusBadge status={order.status} />
                          <select
                            className="status-select"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order, e.target.value)
                            }
                            aria-label={`Change status for ${order.customerName}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => handleDelete(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Micro Business Order Manager</p>
      </footer>
    </div>
  );
}

export default App;
