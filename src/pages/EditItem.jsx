import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/AddItem.css";

function EditItem() {
  const navigate = useNavigate();
  const { id } = useParams();

  const items = JSON.parse(localStorage.getItem("items")) || [];

  const itemToEdit = items.find((item) => item.id === Number(id));

  const [title, setTitle] = useState(itemToEdit ? itemToEdit.name : "");
  const [description, setDescription] = useState(
    itemToEdit ? itemToEdit.description : ""
  );
  const [category, setCategory] = useState(itemToEdit ? itemToEdit.category : "Tools");
  const [condition, setCondition] = useState(
    itemToEdit ? itemToEdit.condition : "Good"
  );
  const [location, setLocation] = useState(itemToEdit ? itemToEdit.location : "");

  const handleEditItem = (e) => {
    e.preventDefault();

    const updatedItems = items.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            name: title,
            description,
            category,
            condition,
            location,
            icon:
              category === "Tools"
                ? "🔨"
                : category === "Electronics"
                ? "📷"
                : category === "Sports & Outdoors"
                ? "🏕️"
                : "📦",
          }
        : item
    );

    localStorage.setItem("items", JSON.stringify(updatedItems));

    navigate("/dashboard");
  };

  if (!itemToEdit) {
    return (
      <div className="add-item-page">
        <div className="add-item-container">
          <h2>Item not found</h2>
          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="add-item-page">
      <div className="add-item-container">
        <Link to="/dashboard" className="back-link">
          ← Back
        </Link>

        <div className="add-item-card">
          <h1>Edit Item</h1>
          <p>Update your item information</p>

          <form onSubmit={handleEditItem}>
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

            <div className="form-actions">
              <button type="submit" className="add-btn">
                Save Changes
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/dashboard")}
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

export default EditItem;