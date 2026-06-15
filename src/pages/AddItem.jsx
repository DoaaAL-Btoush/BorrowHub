import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AddItem.css";

function AddItem() {
  const navigate = useNavigate();

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserId = loggedInUser.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Tools");
  const [condition, setCondition] = useState("Good");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_id", currentUserId);
    formData.append("created_date", new Date().toISOString().split("T")[0]);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("status", "Available");
    formData.append("location", location);
    formData.append("name", title);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add item.");
        return;
      }

      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Cannot connect to the server.");
    }
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

            <label className="upload-box">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                hidden
              />

              <div className="upload-icon">⇧</div>

              {imageFile ? (
                <>
                  <p>{imageFile.name}</p>
                  <span>Image selected</span>
                </>
              ) : (
                <>
                  <p>Click to upload or drag and drop</p>
                  <span>PNG, JPG up to 10MB</span>
                </>
              )}
            </label>

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