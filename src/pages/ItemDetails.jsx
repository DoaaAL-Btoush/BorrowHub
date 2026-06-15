import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/ItemDetails.css";

function ItemDetails() {
  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const role = loggedInUser.role || localStorage.getItem("role") || "user";

  const currentUserId = loggedInUser.id;

  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setItem(null);
          return;
        }

        setItem(data);
      } catch (error) {
        console.log(error);
        setItem(null);
      }
    };

    getItem();
  }, [id]);

  if (!item) {
    return (
      <div className="not-found">
        <h2>Item not found</h2>
        <Link to="/home">← Back to Items</Link>
      </div>
    );
  }

  const isOwner = item.user_id === currentUserId;

  const handleSendRequest = async (e) => {
    e.preventDefault();

    if (isOwner || role === "admin") {
      return;
    }

    const newRequest = {
      requester_id: currentUserId,
      message: message,
      status: "Pending",
      request_date: new Date().toISOString().split("T")[0],
      item_id: item.item_id,
    };

    try {
      const response = await fetch("http://localhost:3000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to send request.");
        return;
      }

      setMessage("");
      setShowRequestForm(false);

      alert("Borrow request sent successfully.");
    } catch (error) {
      console.log(error);
      alert("Cannot connect to the server.");
    }
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
          <img
            src={`http://localhost:3000${item.image_path}`}
            alt={item.name}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
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
              <h3>User #{item.user_id}</h3>
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