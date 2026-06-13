import { useState, useRef } from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import SearchFilters from "../components/SearchFilters";
import ItemsGrid from "../components/ItemsGrid";

function Home() {
  const role = "user";

  const itemsSectionRef = useRef(null);

  const scrollToItems = () => {
    itemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const defaultItems = [
    {
      id: 1,
      name: "Electric Drill",
      description:
        "18V cordless drill with battery and charger. Perfect for home improvement projects.",
      category: "Tools",
      status: "Available",
      owner: "John Smith",
      location: "Downtown",
      icon: "🔨",
    },
    {
      id: 2,
      name: "Camping Tent",
      description:
        "4-person tent, waterproof and easy to set up. Great for weekend trips.",
      category: "Sports & Outdoors",
      status: "Available",
      owner: "Sarah Johnson",
      location: "North Side",
      icon: "🏕️",
    },
    {
      id: 3,
      name: "Digital Camera",
      description:
        "DSLR camera with lens. Perfect for photography enthusiasts.",
      category: "Electronics",
      status: "Borrowed",
      owner: "Mike Davis",
      location: "East End",
      icon: "📷",
    },
  ];

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");

    return savedItems ? JSON.parse(savedItems) : defaultItems;
  });

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const stats = {
    items: items.length,
    members: 0,
    borrows: 0,
  };

  return (
    <>
      <HeroSection role={role} stats={stats} scrollToItems={scrollToItems} />
      <FeatureSection />

      <div ref={itemsSectionRef}>
        <SearchFilters
          searchText={searchText}
          setSearchText={setSearchText}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-message">
          <h2>No Items Found</h2>
          <p>No items match your search or selected category.</p>
        </div>
      ) : (
        <ItemsGrid items={filteredItems} />
      )}
    </>
  );
}

export default Home;