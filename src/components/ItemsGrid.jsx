import ItemCard from "./ItemCard";
import "../css/Home.css";

function ItemsGrid({ items }) {
  return (
    <div className="items-grid">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemsGrid;