import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <nav className="footer">
      <button onClick={() => navigate("/dashboard")}>
        <i className="fa-solid fa-house"></i>
        <span>Inicio</span>
      </button>
      <button onClick={() => navigate("/habits")}>
        <i className="fa-solid fa-list-check"></i>
        <span>Hábitos</span>
      </button>
      <button onClick={() => navigate("/train")}>
        <i className="fa-solid fa-dumbbell"></i>
        <span>Entrenar</span>
      </button>
      <button onClick={() => navigate("/recipes")}>
        <i className="fa-solid fa-book"></i>
        <span>Recetas</span>
      </button>
      <button onClick={() => navigate("/login")}>
        <i className="fa-solid fa-sign-out-alt"></i>
        <span>Cerrar sesión</span>
      </button>
    </nav>
  );
};
