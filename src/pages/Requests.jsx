import { useEffect, useState } from "react";
import "../css/Requests.css";

function Requests() {
  const [selectedStatus, setSelectedStatus] = useState("All Requests");
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserId = Number(loggedInUser.id);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const requestsResponse = await fetch("http://localhost:3000/requests");
      const requestsData = await requestsResponse.json();

      const itemsResponse = await fetch("http://localhost:3000/items");
      const itemsData = await itemsResponse.json();

      const usersResponse = await fetch("http://localhost:3000/users");
      const usersData = await usersResponse.json();

      setRequests(requestsData);
      setItems(itemsData);
      setUsers(usersData);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemById = (itemId) => {
    return items.find((item) => item.item_id === itemId);
  };

  const getUserById = (userId) => {
    return users.find((user) => user.user_id === userId);
  };

  const updateRequestStatus = async (request, newStatus) => {
    const updatedRequest = {
      requester_id: request.requester_id,
      message: request.message,
      status: newStatus,
      request_date: String(request.request_date).split("T")[0],
      item_id: request.item_id,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/requests/${request.request_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRequest),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update request.");
        return;
      }

      setRequests(
        requests.map((req) =>
          req.request_id === request.request_id ? data : req
        )
      );

      if (newStatus === "Approved") {
        const itemData = getItemById(request.item_id);

        if (itemData) {
          const formData = new FormData();

          formData.append("user_id", itemData.user_id);
          formData.append(
            "created_date",
            String(itemData.created_date).split("T")[0]
          );
          formData.append("description", itemData.description);
          formData.append("category", itemData.category);
          formData.append("condition", itemData.condition);
          formData.append("status", "Borrowed");
          formData.append("location", itemData.location);
          formData.append("name", itemData.name);
          formData.append("old_image_path", itemData.image_path);

          await fetch(`http://localhost:3000/items/${request.item_id}`, {
            method: "PUT",
            body: formData,
          });

          setItems(
            items.map((item) =>
              item.item_id === request.item_id
                ? { ...item, status: "Borrowed" }
                : item
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
      alert("Cannot connect to the server.");
    }
  };

  const ownerRequests = requests.filter((request) => {
    const item = getItemById(request.item_id);

    return item && item.user_id === currentUserId;
  });

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
          filteredRequests.map((request) => {
            const item = getItemById(request.item_id);
            const requester = getUserById(request.requester_id);

            return (
              <div className="request-card" key={request.request_id}>
                <div className="request-header">
                  <div className="request-user">
                    <span className="request-avatar">👩</span>

                    <div>
                      <h3>{requester ? requester.full_name : "Requester"}</h3>
                      <p>
                        Request for:{" "}
                        <strong>{item ? item.name : `Item #${request.item_id}`}</strong>
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
                  <p>
                    Requested on {String(request.request_date).split("T")[0]}
                  </p>

                  {request.status === "Pending" && (
                    <div className="request-actions">
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateRequestStatus(request, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateRequestStatus(request, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Requests;