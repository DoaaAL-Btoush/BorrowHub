import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

function Dashboard() {
  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserId = Number(loggedInUser.id);

  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getItems();
    getRequests();
  }, []);

  const getItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/items`);
      const data = await response.json();

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      const response = await fetch(`${BASE_URL}/requests`);
      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const myItems = items.filter(
    (item) => item.user_id === currentUserId
  );

  const pendingRequests = requests.filter(
    (request) =>
      myItems.some((item) => item.item_id === request.item_id) &&
      request.status === "Pending"
  );

  const borrowedItems = requests.filter(
    (request) =>
      request.requester_id === currentUserId &&
      request.status === "Approved"
  );

  const handleDeleteItem = async (id, status) => {
    if (status === "Borrowed") {
      alert("This item cannot be deleted because it is currently borrowed.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete item.");
        return;
      }

      const updatedItems = items.filter((item) => item.item_id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
      alert("Cannot connect to the server.");
    }
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
              <div className="my-item-row" key={item.item_id}>
                <div className="my-item-info">
                  <div className="my-item-icon">
                    <img
                      src={`${BASE_URL}${item.image_path}`}
                      alt={item.name}
                      style={{
                        width: "55px",
                        height: "55px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${BASE_URL}/uploads/default-item.png`;
                      }}
                    />
                  </div>

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
                  <button
                    onClick={() => navigate(`/edit-item/${item.item_id}`)}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteItem(item.item_id, item.status)
                    }
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