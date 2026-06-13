import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AddItem.css";

function AddItem() {
  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserName = loggedInUser.name || "Current User";
  const currentUserEmail = loggedInUser.email || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Tools");
  const [condition, setCondition] = useState("Good");
  const [location, setLocation] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();

    const existingItems =
      JSON.parse(localStorage.getItem("items")) || [];

    const newItem = {
      id: Date.now(),
      name: title,
      description,
      category,
      condition,
      location,
      status: "Available",
      owner: currentUserName,
      ownerEmail: currentUserEmail,

      icon:
        category === "Tools"
          ? "🔨"
          : category === "Electronics"
          ? "📷"
          : category === "Sports & Outdoors"
          ? "🏕️"
          : "📦",
    };

    const updatedItems = [...existingItems, newItem];

    localStorage.setItem("items", JSON.stringify(updatedItems));

    navigate("/home");
  };

  return (
    <div className="add-item-page">
      <div className="add-item-container">
        <Link to="/home" className="back-link">
          ← Back
        </Link>

        <div className="add-item-card">
          <h1>Share an Item</h1>

          <p>List an item you're willing to lend to the community</p>

          <form onSubmit={handleAddItem}>
            <label>Item Title</label>

            <input
              type="text"
              placeholder="e.g., Electric Drill"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>

            <textarea
              placeholder="Describe your item, its features, and any important details."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="form-row">
              <div>
                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Tools</option>
                  <option>Sports & Outdoors</option>
                  <option>Electronics</option>
                  <option>Entertainment</option>
                </select>
              </div>

              <div>
                <label>Condition</label>

                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option>New</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
            </div>

            <label>Location</label>

            <input
              type="text"
              placeholder="e.g., Downtown, North Side"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label>Item Photo</label>

            <div className="upload-box">
              <div className="upload-icon">⇧</div>
              <p>Click to upload or drag and drop</p>
              <span>PNG, JPG up to 10MB</span>
            </div>

            <div className="form-actions">
              <button type="submit" className="add-btn">
                Add Item
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddItem;