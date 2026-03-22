import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { to: "/dashboard", label: "Painel de Visualização" },
  { to: "/items", label: "Estoque" },
  { to: "/transactions", label: "Movimentações" },
];

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuAberto(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📦</span>
          <div className={styles.logoTexts}>
            <span className={styles.logoTitle}>SimpleEstoque</span>
            <span className={styles.logoSubtitle}>Controle de Doações</span>
          </div>
        </div>

        <div className={styles.links}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {isMobile && (
          <button
            className={styles.hamburguer}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className={styles.hamburguerLine} />
            <span className={styles.hamburguerLine} />
            <span className={styles.hamburguerLine} />
          </button>
        )}
      </div>

      {isMobile && menuAberto && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuAberto(false)}
              className={styles.mobileLink}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
