export default function Navigation() {
  return (
    <nav className="glowstone-nav">
      <a href="#" className="glowstone-nav-logo" aria-label="Glowstone home">
        <img src="/brand/glowstone-mark.png" alt="Glowstone" />
      </a>

      <div className="glowstone-nav-links">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#/contact">Contact</a>
      </div>
    </nav>
  );
}
