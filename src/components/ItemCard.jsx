import { Link } from "react-router-dom";
import "../css/Home.css";

function ItemCard({ item }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <Link to={`/items/${item.id}`} className="item-card-link text-decoration-none">
        <div className="card h-100 shadow-sm item-card">
          <div className="item-image">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="card-img-top"
              style={{
                height: "220px",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  `${import.meta.env.VITE_SERVER_URL}/uploads/default-item.png`;
              }}
            />
          </div>

          <div className="card-body item-content">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title mb-0">{item.name}</h5>

              <span
                className={
                  item.status === "Available"
                    ? "badge bg-success"
                    : "badge bg-secondary"
                }
              >
                {item.status}
              </span>
            </div>

            <p className="card-text">{item.description}</p>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>📍 {item.location}</span>
            </div>

            <span className="badge bg-warning text-dark">
              {item.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemCard;