import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      {/* Desktop Navigation */}
      <div className={styles.desktop}>
        <Link to="/" className={styles.logo}>
          Glamping
        </Link>
        <div className={styles.links}>
          <Link to="/">Hjem</Link>
          <Link to="/ophold">Ophold</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/aktiviteter">Aktiviteter</Link>
        </div>
      </div>

      {/* Mobile Burger Button */}
      <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Hjem
          </Link>
          <Link to="/ophold" onClick={() => setMenuOpen(false)}>
            Ophold
          </Link>
          <Link to="/kontakt" onClick={() => setMenuOpen(false)}>
            Kontakt
          </Link>
          <Link to="/aktiviteter" onClick={() => setMenuOpen(false)}>
            Aktiviteter
          </Link>
        </div>
      )}
    </nav>
  );
}
