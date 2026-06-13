import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "../css/ItemDetails.css";

function ItemDetails() {
  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const role =
    loggedInUser.role || localStorage.getItem("role") || "user";

  const currentUserName = loggedInUser.name || "Guest";
  const currentUserEmail = loggedInUser.email || "";

  const { id } = useParams();

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [message, setMessage] = useState("");

  const defaultItems = [
    {
      id: 1,
      name: "Electric Drill",
      description:
        "18V cordless drill with battery and charger. Perfect for home improvement projects.",
      category: "Tools",
      condition: "Excellent",
      status: "Available",
      owner: "John Smith",
      ownerEmail: "john.smith@email.com",
      location: "Downtown",
      icon: "🔨",
    },
    {
      id: 2,
      name: "Camping Tent",
      description:
        "4-person tent, waterproof and easy to set up. Great for weekend trips.",
      category: "Sports & Outdoors",
      condition: "Excellent",
      status: "Available",
      owner: "Sarah Johnson",
      ownerEmail: "sarah.j@email.com",
      location: "North Side",
      icon: "🏕️",
    },
    {
      id: 3,
      name: "Digital Camera",
      description:
        "DSLR camera with lens. Perfect for photography enthusiasts.",
      category: "Electronics",
      condition: "Excellent",
      status: "Borrowed",
      owner: "Mike Davis",
      ownerEmail: "mike.davis@email.com",
      location: "East End",
      icon: "📷",
    },
  ];

  const savedItems = JSON.parse(localStorage.getItem("items")) || defaultItems;

  const item = savedItems.find((item) => item.id === Number(id));

  if (!item) {
    return (
      <div className="not-found">
        <h2>Item not found</h2>
        <Link to="/home">← Back to Items</Link>
      </div>
    );
  }

  const isOwner =
    item.ownerEmail === currentUserEmail ||
    item.owner === currentUserName;

  const handleSendRequest = (e) => {
    e.preventDefault();

    if (isOwner || role === "admin") {
      return;
    }

    const existingRequests =
      JSON.parse(localStorage.getItem("requests")) || [];

    const request = {
      id: Date.now(),
      requester: currentUserName,
      requesterEmail: currentUserEmail,
      owner: item.owner,
      ownerEmail: item.ownerEmail,
      item: item.name,
      itemId: item.id,
      message,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      icon: "👩",
    };

    const updatedRequests = [...existingRequests, request];

    localStorage.setItem("requests", JSON.stringify(updatedRequests));

    setMessage("");
    setShowRequestForm(false);

    alert("Borrow request sent successfully.");
  };

  return (
    <>
      <div className="back-link-container">
        <Link to="/home" className="back-link">
          ← Back to Items
        </Link>
      </div>

      <div className="details-page">
        <div className="details-image">
          <span>{item.icon}</span>
        </div>

        <div className="details-card">
          <div className="details-title">
            <h1>{item.name}</h1>

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

          <p className="details-description">{item.description}</p>

          <div className="details-info">
            <p>
              🏷️ <strong>Category:</strong> {item.category}
            </p>

            <p>
              📋 <strong>Condition:</strong> {item.condition}
            </p>

            <p>
              📍 <strong>Location:</strong> {item.location}
            </p>
          </div>

          <hr />

          <h4>OWNER</h4>

          <div className="owner-box">
            <span>👩</span>

            <div>
              <h3>{item.owner}</h3>
              <p>Community Member</p>
            </div>
          </div>

          {role === "admin" ? (
            <div className="admin-note">
              Admins can only view items. Borrowing is restricted to regular users.
            </div>
          ) : isOwner ? (
            <div className="admin-note">
              You cannot request to borrow your own item.
            </div>
          ) : (
            <>
              <button
                className="request-borrow-btn"
                onClick={() => setShowRequestForm(true)}
              >
                💬 Request to Borrow
              </button>

              {showRequestForm && (
                <div className="borrow-request-card">
                  <h2>Send Borrow Request</h2>

                  <form onSubmit={handleSendRequest}>
                    <label>Message to Owner</label>

                    <textarea
                      placeholder="When do you need it? How long will you need it for?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <div className="request-form-actions">
                      <button type="submit" className="send-request-btn">
                        Send Request
                      </button>

                      <button
                        type="button"
                        className="cancel-request-btn"
                        onClick={() => setShowRequestForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ItemDetails;