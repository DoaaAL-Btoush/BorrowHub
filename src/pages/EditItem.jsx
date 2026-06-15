import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/AddItem.css";

function EditItem() {
  const navigate = useNavigate();
  const { id } = useParams();

  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const currentUserId = loggedInUser.id;

  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Tools");
  const [condition, setCondition] = useState("Good");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setItemToEdit(null);
          setLoading(false);
          return;
        }

        setItemToEdit(data);
        setTitle(data.name);
        setDescription(data.description);
        setCategory(data.category);
        setCondition(data.condition);
        setLocation(data.location);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setItemToEdit(null);
        setLoading(false);
      }
    };

    getItem();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_id", currentUserId);
    formData.append("created_date", itemToEdit.created_date);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("status", itemToEdit.status);
    formData.append("location", location);
    formData.append("name", title);
    formData.append("old_image_path", itemToEdit.image_path);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update item.");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Cannot connect to the server.");
    }
  };

  if (loading) {
    return (
      <div className="add-item-page">
        <div className="add-item-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

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

            <label>Current Photo</label>

            <div className="upload-box">
              <img
                src={`http://localhost:3000${itemToEdit.image_path}`}
                alt={itemToEdit.name}
                style={{
                  width: "120px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />

              <p>Current item photo</p>
            </div>

            <label>Change Photo</label>

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
                  <span>New image selected</span>
                </>
              ) : (
                <>
                  <p>Click to upload a new photo</p>
                  <span>PNG, JPG up to 10MB</span>
                </>
              )}
            </label>

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