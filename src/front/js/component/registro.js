import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import "../../styles/registro.css";
import Image1 from "../../img/img1.png";
import Logo from "../../img/vitality.png";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001/api";

export const Registro = () => {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          last_name: lastName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const { user, token } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        actions.loginUser(user, token);

        Swal.fire(
          "¡Éxito!",
          "Usuario registrado e iniciado sesión.",
          "success"
        ).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire(
          "Error",
          data.error || data.message || "Error desconocido",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Error al conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-bg"
      style={{ backgroundImage: `url(${Image1})` }}
    >
      <div className="register-container">
      
        <div className="logo">
          <img src={Logo} alt="Vitality Logo" />
        </div>

      
        <h3>Crear cuenta</h3>

       
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

     
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña (mín. 6 letras y números)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

         
          <div className="password-container">
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repetir contraseña"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              minLength={6}
            />
            <i
              className={`fa ${showRepeatPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            ></i>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};