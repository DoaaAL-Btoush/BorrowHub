import { Link } from "react-router-dom";
import "../css/Home.css";

function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.id}`} className="item-card-link">
      <div className="item-card">
        <div className="item-image">
          <span>{item.icon}</span>
        </div>

        <div className="item-content">
          <div className="item-title-row">
            <h3>{item.name}</h3>
            <span className={item.status === "Available" ? "status available" : "status borrowed"}>
              {item.status}
            </span>
          </div>

          <p>{item.description}</p>

          <div className="item-owner">
            <span>👤 {item.owner}</span>
            <span>📍 {item.location}</span>
          </div>

          <span className="item-category">{item.category}</span>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;