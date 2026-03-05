import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => {
  const navigate = useNavigate();

  const goToHabitLevel = () => {
    const days = parseInt(localStorage.getItem("habitDays")) || 0;

    if (days < 7) {
      navigate("/nivel1");
    } else if (days < 14) {
      navigate("/nivel2");
    } else {
      navigate("/nivel3");
    }
  };

  return (
    <nav className="footer">
      <button onClick={goToHabitLevel}>
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

      <button onClick={() => navigate("/dashboard")}>
        <i className="fa-solid fa-money-bill-trend-up"></i>
        <span>Finanzas</span>
      </button>

      <button onClick={() => navigate("/login")}>
        <i className="fa-solid fa-sign-out-alt"></i>
        <span>Cerrar sesión</span>
      </button>
    </nav>
  );
};