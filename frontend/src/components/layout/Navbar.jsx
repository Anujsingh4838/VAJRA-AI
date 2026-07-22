import "../../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">⚡</div>

        <div className="navbar__text">
          <h1>VAJRA</h1>
          <p>On its way to secure every digital transaction.</p>
        </div>
      </div>

      <div className="navbar__status">
        <span className="navbar__status-dot"></span>
        <span>AI Engine Online</span>
      </div>
    </header>
  );
}

export default Navbar;