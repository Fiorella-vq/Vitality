import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Image1 from "../../img/img1.png"; 
import Logo from "../../img/vitality.png";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
     
      <div
        className="bg-image"
        style={{ backgroundImage: `url(${Image1})` }}
      ></div>

      <div className="overlay"></div>

   
      <div className="home-content">

        <div className="logo">
          <img src={Logo} alt="Vitality Logo" />
        </div>

        <h1>Bienvenido a Vitality</h1>
        <p>Tu compañero para una vida más saludable</p>

        {loading ? (
          <div className="loading-container">
            <p>Cargando la app... {progress}%</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">
              <button className="btn-login">Iniciar sesión</button>
            </Link>
            <Link to="/registro">
              <button className="btn-register">Registrarse</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};