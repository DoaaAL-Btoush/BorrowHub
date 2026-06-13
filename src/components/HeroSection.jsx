import "../css/Home.css";
import { useNavigate } from "react-router-dom";

function HeroSection({ role, stats, scrollToItems }) {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">🌱 Sustainable Community Sharing</span>

        <h1>
          Borrow What You Need,
          <br />
          <span>Share What You Have</span>
        </h1>

        <p>
          Access items when you need them without buying. Build community
          connections while saving money and helping the planet!
        </p>

        <div className="hero-buttons">
          {role !== "admin" && (
            <button
              className="primary-btn"
              onClick={() => navigate("/add-item")}
            >
              Share an Item →
            </button>
          )}

          <button className="secondary-btn" onClick={scrollToItems}>
            Browse Items
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h3>{stats.items}</h3>
            <p>Items Available</p>
          </div>

          <div>
            <h3>{stats.members}</h3>
            <p>Community Members</p>
          </div>

          <div>
            <h3>{stats.borrows}</h3>
            <p>Successful Borrows</p>
          </div>
        </div>
      </div>

      <div className="hero-cards">
        <div className="mini-card card-one">
          <span>📦</span>
          <h4>Borrow</h4>
          <p>Access what you need</p>
        </div>

        <div className="mini-card card-two">
          <span>🤝</span>
          <h4>Share</h4>
          <p>Lend your items</p>
        </div>

        <div className="mini-card card-three">
          <span>🌱</span>
          <h4>Sustain</h4>
          <p>Reduce waste</p>
        </div>

        <div className="mini-card card-four">
          <span>💚</span>
          <h4>Connect</h4>
          <p>Build community</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;