import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import User from "../../img/user.png";
import Nutri from "../../img/nutri.jpg";
import Finanzas from "../../img/finanza.webp";
import Habitos from "../../img/diario.jpg";
import Deportes from "../../img/deporte.webp";

export const Principal = () => {
  const { store } = useContext(Context);

  const daysComplete = store.dayscomplete || 0;
  const totalDays = 21;
  const level = store.level || 1;
  const progressPercent = Math.round((daysComplete / totalDays) * 100);

  return (
    <div className="text-center mt-5">
      <img src={User} alt="Imagen de usuario" className="welcome-image" />
      <h1>Bienvenido</h1>
      <h2>Hola, {store.name || "Usuario"}</h2>
      <p>
        Tu progreso es del {store.progress || 0}% y tu nivel es {level}
      </p>

      <div className="progreso">
        <h4>Tu Progreso</h4>
        <p>{store.progress || 0}%</p>
      </div>

      <div className="habitos-card">
        <h4>Hábitos Saludables</h4>
        <div className="progress-info">
          <span>
            {daysComplete} / {totalDays} días
          </span>
          <span>{progressPercent}% completado</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p>
          ✔ Nivel {level} completado! Sigue así para el Nivel {level + 1}.
        </p>
      </div>

      <h1>Explorar</h1>

      <div
        className="seguimientoDiario card-bg"
        style={{ backgroundImage: `url(${Habitos})` }}
        aria-label="Hábitos"
      >
        <div className="card-overlay">
          <h4>Seguimiento Diario</h4>
          <p>Nivel 1 (7) · Nivel 2 (14) · Nivel 3 (21)</p>
        </div>
      </div>

      <div
        className="rutinasDePoder card-bg"
        style={{ backgroundImage: `url(${Deportes})` }}
        aria-label="Entrenamientos"
      >
        <div className="card-overlay">
          <h4>Entrenamientos</h4>
          <p>Rutinas de Poder</p>
          <p>Cross · Running · Básico</p>
        </div>
      </div>

      <div
        className="recetasSaludables card-bg"
        style={{ backgroundImage: `url(${Nutri})` }}
        aria-label="Nutrición"
      >
        <div className="card-overlay">
          <h4>Nutrición</h4>
          <p>Recetas Saludables</p>
          <p>Desayunos · Snacks · Postres</p>
        </div>
      </div>

      <div
        className="finanzasSaludables card-bg"
        style={{ backgroundImage: `url(${Finanzas})` }}
        aria-label="Finanzas"
      >
        <div className="card-overlay">
          <h4>Finanzas</h4>
          <p>Ahorro e inversión</p>
          <p>Método Kakebo · Ahorro</p>
        </div>
      </div>
    </div>
  );
};
