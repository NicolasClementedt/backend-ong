import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Painel de Visualização" },
  { to: "/items", label: "Estoque" },
  { to: "/transactions", label: "Movimentações" },
];

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuAberto(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <span className="text-xl font-bold tracking-wide">
          📦 SimpleEstoque
        </span>

        {/* Links desktop */}
        {!isMobile && (
          <div className="flex gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-200 ${
                    isActive
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-blue-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Botão hamburguer - só em mobile */}
        {isMobile && (
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${menuAberto ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${menuAberto ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${menuAberto ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Menu mobile aberto */}
      {isMobile && menuAberto && (
        <div className="bg-blue-800 px-4 pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) =>
                `text-sm font-medium py-2 border-b border-blue-700 ${
                  isActive ? "text-white" : "text-blue-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
