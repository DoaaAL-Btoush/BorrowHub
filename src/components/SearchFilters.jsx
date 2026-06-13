import "../css/Home.css";

function SearchFilters({ searchText, setSearchText, selectedCategory, setSelectedCategory }) {
  const categories = ["All", "Tools", "Sports & Outdoors", "Electronics", "Entertainment"];

  return (
    <section className="search-section">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "filter-btn active-filter" : "filter-btn"}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "Tools" && "🔨 "}
            {category === "Sports & Outdoors" && "🏕️ "}
            {category === "Electronics" && "📷 "}
            {category === "Entertainment" && "🎲 "}
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SearchFilters;