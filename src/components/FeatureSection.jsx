import "../css/Home.css";

function FeatureSection() {
  return (
    <section className="feature-section">

      <div className="feature-card orange-card">
        <div className="feature-icon">✨</div>

        <div>
          <h3>Free to Use</h3>
          <p>No hidden fees</p>
        </div>
      </div>

      <div className="feature-card green-card">
        <div className="feature-icon">🌱</div>

        <div>
          <h3>Eco-Friendly</h3>
          <p>Reduce waste</p>
        </div>
      </div>

      <div className="feature-card blue-card">
        <div className="feature-icon">👥</div>

        <div>
          <h3>Community</h3>
          <p>Trusted members</p>
        </div>
      </div>

      <div className="feature-card purple-card">
        <div className="feature-icon">📈</div>

        <div>
          <h3>Growing</h3>
          <p>Join the movement</p>
        </div>
      </div>

    </section>
  );
}

export default FeatureSection;