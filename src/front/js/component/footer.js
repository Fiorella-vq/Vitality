import React from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/dashboard">🏠<span>Inicio</span></Link>
      <Link to="/habits">✔<span>Hábitos</span></Link>
      <Link to="/train">🏋️<span>Entrenar</span></Link>
      <Link to="/recipes">🍽️<span>Recetas</span></Link>
    </nav>
  );
};

export default BottomNav;