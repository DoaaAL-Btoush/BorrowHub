import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserName = loggedInUser.name || "Guest";
  const currentUserEmail = loggedInUser.email || "";

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const requests = JSON.parse(localStorage.getItem("requests")) || [];

  const myItems = items.filter(
    (item) =>
      item.ownerEmail === currentUserEmail ||
      item.owner === currentUserName
  );

  const pendingRequests = requests.filter(
    (request) =>
      (request.ownerEmail === currentUserEmail ||
        request.owner === currentUserName) &&
      request.status === "Pending"
  );

  const borrowedItems = requests.filter(
    (request) =>
      request.requesterEmail === currentUserEmail &&
      request.status === "Approved"
  );

  const handleDeleteItem = (id, status) => {
    if (status === "Borrowed") {
      alert("This item cannot be deleted because it is currently borrowed.");
      return;
    }

    const updatedItems = items.filter((item) => item.id !== id);

    localStorage.setItem("items", JSON.stringify(updatedItems));

    setItems(updatedItems);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>My Dashboard</h1>

        <p>Manage your shared items and borrowing requests</p>

        <div className="dashboard-stats">
          <div className="dashboard-card orange-stat">
            <span>📦</span>
            <p>My Items</p>
            <h2>{myItems.length}</h2>
          </div>

          <div className="dashboard-card green-stat">
            <span>💬</span>
            <p>Pending Requests</p>
            <h2>{pendingRequests.length}</h2>
          </div>

          <div className="dashboard-card blue-stat">
            <span>🧊</span>
            <p>Items Borrowed</p>
            <h2>{borrowedItems.length}</h2>
          </div>
        </div>

        <div className="my-items-section">
          <div className="section-title-row">
            <h2>My Items</h2>

            <button onClick={() => navigate("/add-item")}>
              Add New Item
            </button>
          </div>

          {myItems.length === 0 ? (
            <div className="dashboard-empty">
              <h3>No Items Yet</h3>
              <p>You have not added any items yet.</p>
            </div>
          ) : (
            myItems.map((item) => (
              <div className="my-item-row" key={item.id}>
                <div className="my-item-info">
                  <div className="my-item-icon">{item.icon}</div>

                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>

                    <span
                      className={
                        item.status === "Available"
                          ? "status available"
                          : "status borrowed"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="my-item-actions">
                  <button onClick={() => navigate(`/edit-item/${item.id}`)}>
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id, item.status)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;