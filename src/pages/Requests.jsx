import { useState } from "react";
import "../css/Requests.css";

function Requests() {
  const [selectedStatus, setSelectedStatus] = useState("All Requests");

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserName = loggedInUser.name || "Guest";
  const currentUserEmail = loggedInUser.email || "";

  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem("requests")) || []
  );

  const updateRequestStatus = (id, newStatus, itemId) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );

    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);

    if (newStatus === "Approved") {
      const items = JSON.parse(localStorage.getItem("items")) || [];

      const updatedItems = items.map((item) =>
        item.id === itemId
          ? { ...item, status: "Borrowed" }
          : item
      );

      localStorage.setItem("items", JSON.stringify(updatedItems));
    }
  };

  const ownerRequests = requests.filter(
    (request) =>
      request.ownerEmail === currentUserEmail ||
      request.owner === currentUserName
  );

  const filteredRequests =
    selectedStatus === "All Requests"
      ? ownerRequests
      : ownerRequests.filter((request) => request.status === selectedStatus);

  return (
    <div className="requests-page">
      <div className="requests-container">
        <h1>Borrowing Requests</h1>
        <p>View and manage all borrowing requests for your items</p>

        <div className="request-filters">
          {["All Requests", "Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              className={
                selectedStatus === status
                  ? "request-filter active-request-filter"
                  : "request-filter"
              }
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {filteredRequests.length === 0 ? (
          <div className="empty-message">
            <h2>No Requests Found</h2>
            <p>There are no borrowing requests for your items yet.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div className="request-card" key={request.id}>
              <div className="request-header">
                <div className="request-user">
                  <span className="request-avatar">{request.icon || "👩"}</span>

                  <div>
                    <h3>{request.requester}</h3>
                    <p>
                      Request for: <strong>{request.item}</strong>
                    </p>
                  </div>
                </div>

                <span
                  className={`request-status ${request.status.toLowerCase()}`}
                >
                  {request.status}
                </span>
              </div>

              <div className="request-message">{request.message}</div>

              <div className="request-footer">
                <p>Requested on {request.date}</p>

                {request.status === "Pending" && (
                  <div className="request-actions">
                    <button
                      className="approve-btn"
                      onClick={() =>
                        updateRequestStatus(
                          request.id,
                          "Approved",
                          request.itemId
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateRequestStatus(
                          request.id,
                          "Rejected",
                          request.itemId
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Requests;