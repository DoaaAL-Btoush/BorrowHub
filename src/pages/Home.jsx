import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import SearchFilters from "../components/SearchFilters";
import ItemsGrid from "../components/ItemsGrid";

function Home() {
  const loggedInUser =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const role = loggedInUser.role || localStorage.getItem("role") || "user";

  const itemsSectionRef = useRef(null);

  const scrollToItems = () => {
    itemsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/items");
        const data = await response.json();

        if (!response.ok) {
          console.log(data.message || "Error retrieving items");
          return;
        }

        const formattedItems = data.map((item) => ({
          id: item.item_id,
          name: item.name,
          description: item.description,
          category: item.category,
          status: item.status,
          ownerId: item.user_id,
          location: item.location,
          condition: item.condition,
          imagePath: item.image_path,
          imageUrl: item.image_path
            ? `http://localhost:3000${item.image_path}`
            : "http://localhost:3000/uploads/default-item.png",
        }));

        setItems(formattedItems);
      } catch (error) {
        console.log(error);
      }
    };

    getItems();
  }, []);

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
    borrows: items.filter((item) => item.status === "Borrowed").length,
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