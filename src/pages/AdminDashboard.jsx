import { useEffect, useState } from "react";
import "../css/Admin.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchUser, setSearchUser] = useState("");

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getUsers();
    getItems();
    getRequests();
  }, []);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setUsers(data);
  };

  const getItems = async () => {
    const response = await fetch("http://localhost:3000/items");
    const data = await response.json();
    setItems(data);
  };

  const getRequests = async () => {
    const response = await fetch("http://localhost:3000/requests");
    const data = await response.json();
    setRequests(data);
  };

  const availableItems = items.filter((item) => item.status === "Available");
  const pendingRequests = requests.filter((request) => request.status === "Pending");
  const activeUsers = users.filter((user) => user.status !== "Suspended");

  const categoryCounts = {
    Tools: items.filter((item) => item.category === "Tools").length,
    "Sports & Outdoors": items.filter((item) => item.category === "Sports & Outdoors").length,
    Electronics: items.filter((item) => item.category === "Electronics").length,
    Entertainment: items.filter((item) => item.category === "Entertainment").length,
  };

  const totalItems = items.length;

  const getPercentage = (count) => {
    return totalItems === 0 ? 0 : Math.round((count / totalItems) * 100);
  };

  const latestItem = items.length > 0 ? items[items.length - 1] : null;
  const latestRequest = requests.length > 0 ? requests[requests.length - 1] : null;
  const latestUser = users.length > 0 ? users[users.length - 1] : null;

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const toggleUserStatus = async (user) => {
    const newStatus = user.status === "Suspended" ? "active" : "Suspended";

    const updatedUser = {
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: newStatus,
      joined_date: String(user.joined_date).split("T")[0],
    };

    const response = await fetch(`http://localhost:3000/users/${user.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to update user.");
      return;
    }

    setUsers(
      users.map((u) => (u.user_id === user.user_id ? data : u))
    );
  };

  const getUserItemsCount = (user) => {
    return items.filter((item) => item.user_id === user.user_id).length;
  };

  const getUserRequestsCount = (user) => {
    return requests.filter((request) => request.requester_id === user.user_id).length;
  };

  const handleDeleteItem = async (id) => {
    const response = await fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete item.");
      return;
    }

    setItems(items.filter((item) => item.item_id !== id));
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-title">
          <h1>🛡️ Admin Dashboard</h1>
          <p>Monitor and manage the BorrowHub community</p>
        </div>

        <div className="admin-tabs">
          <button
            className={activeTab === "overview" ? "active-tab" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Platform Overview
          </button>

          <button
            className={activeTab === "users" ? "active-tab" : ""}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>

          <button
            className={activeTab === "content" ? "active-tab" : ""}
            onClick={() => setActiveTab("content")}
          >
            Content Moderation
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            <div className="admin-stats">
              <div className="admin-stat-card orange-border">
                <div className="stat-top">
                  <span>👥</span>
                  <span className="trend">↗</span>
                </div>
                <p>Community Members</p>
                <h2>{users.length}</h2>
                <small>Registered users</small>
              </div>

              <div className="admin-stat-card green-border">
                <div className="stat-top">
                  <span>📦</span>
                  <span className="trend">↗</span>
                </div>
                <p>Items Available</p>
                <h2>{availableItems.length}</h2>
                <small>Available now</small>
              </div>

              <div className="admin-stat-card blue-border">
                <div className="stat-top">
                  <span>💬</span>
                  <span className="trend">✓</span>
                </div>
                <p>Borrowing Requests</p>
                <h2>{requests.length}</h2>
                <small>{pendingRequests.length} pending</small>
              </div>

              <div className="admin-stat-card green-border">
                <div className="stat-top">
                  <span>👥</span>
                  <span className="trend">✓</span>
                </div>
                <p>Active Users</p>
                <h2>{activeUsers.length}</h2>
                <small>Not suspended</small>
              </div>
            </div>

            <div className="admin-bottom">
              <div className="admin-panel-card">
                <h3>Recent Activity</h3>

                <div className="activity green-activity">
                  <span>✅</span>
                  <div>
                    <h4>
                      {latestItem
                        ? `New item added: "${latestItem.name}"`
                        : "No items added yet"}
                    </h4>
                    <p>
                      {latestItem
                        ? `by user #${latestItem.user_id}`
                        : "No activity yet"}
                    </p>
                  </div>
                </div>

                <div className="activity blue-activity">
                  <span>💬</span>
                  <div>
                    <h4>
                      {latestRequest
                        ? `Borrow request for item #${latestRequest.item_id}`
                        : "No borrow requests yet"}
                    </h4>
                    <p>
                      {latestRequest
                        ? `${latestRequest.status} request`
                        : "0 pending requests"}
                    </p>
                  </div>
                </div>

                <div className="activity orange-activity">
                  <span>👥</span>
                  <div>
                    <h4>
                      {latestUser
                        ? `New user registered: ${latestUser.full_name}`
                        : "No users registered yet"}
                    </h4>
                    <p>{users.length} community members</p>
                  </div>
                </div>
              </div>

              <div className="admin-panel-card">
                <h3>Popular Categories</h3>

                <div className="category-row">
                  <p>
                    Tools <span>{getPercentage(categoryCounts.Tools)}%</span>
                  </p>
                  <div className="progress">
                    <div
                      className="tools-bar"
                      style={{ width: `${getPercentage(categoryCounts.Tools)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="category-row">
                  <p>
                    Sports & Outdoors{" "}
                    <span>{getPercentage(categoryCounts["Sports & Outdoors"])}%</span>
                  </p>
                  <div className="progress">
                    <div
                      className="sports-bar"
                      style={{
                        width: `${getPercentage(
                          categoryCounts["Sports & Outdoors"]
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="category-row">
                  <p>
                    Electronics{" "}
                    <span>{getPercentage(categoryCounts.Electronics)}%</span>
                  </p>
                  <div className="progress">
                    <div
                      className="electronics-bar"
                      style={{
                        width: `${getPercentage(categoryCounts.Electronics)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="category-row">
                  <p>
                    Entertainment{" "}
                    <span>{getPercentage(categoryCounts.Entertainment)}%</span>
                  </p>
                  <div className="progress">
                    <div
                      className="entertainment-bar"
                      style={{
                        width: `${getPercentage(categoryCounts.Entertainment)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="admin-panel-card user-management-card">
            <h3>User Management</h3>
            <p>Monitor community members and manage user accounts</p>

            <input
              type="text"
              className="admin-search"
              placeholder="🔍 Search users..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />

            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Items</th>
                  <th>Requests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.user_id}>
                      <td>
                        <div className="user-info">
                          <span>👩</span>
                          <div>
                            <strong>{user.full_name}</strong>
                            <p>
                              Joined{" "}
                              {String(user.joined_date).split("T")[0]}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span className="role-badge">
                          {user.role || "user"}
                        </span>
                      </td>

                      <td>{getUserItemsCount(user)}</td>

                      <td>{getUserRequestsCount(user)}</td>

                      <td>
                        <span
                          className={
                            user.status === "Suspended"
                              ? "suspended-badge"
                              : "active-badge"
                          }
                        >
                          {user.status || "active"}
                        </span>
                      </td>

                      <td>
                        <button
                          className={
                            user.status === "Suspended"
                              ? "activate-btn"
                              : "suspend-btn"
                          }
                          onClick={() => toggleUserStatus(user)}
                        >
                          {user.status === "Suspended"
                            ? "Activate"
                            : "Suspend"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "content" && (
          <div className="admin-panel-card content-moderation-card">
            <h3>Content Moderation</h3>

            <p>Review and remove inappropriate or policy-violating items</p>

            <table className="users-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Owner</th>
                  <th>Category</th>
                  <th>Condition</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="7">No items available.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.item_id}>
                      <td>
                        <div className="user-info">
                          <img
                            src={`http://localhost:3000${item.image_path}`}
                            alt={item.name}
                            style={{
                              width: "38px",
                              height: "38px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "http://localhost:3000/uploads/default-item.png";
                            }}
                          />

                          <strong>{item.name}</strong>
                        </div>
                      </td>

                      <td>User #{item.user_id}</td>

                      <td>
                        <span className="category-badge">
                          {item.category}
                        </span>
                      </td>

                      <td>{item.condition}</td>

                      <td>
                        <span
                          className={
                            item.status === "Available"
                              ? "status-badge-available"
                              : "status-badge-borrowed"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{item.location}</td>

                      <td>
                        <button
                          className="delete-item-btn"
                          onClick={() => handleDeleteItem(item.item_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;