import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";
import "../../styles/registro.css";
import Image1 from "../../img/img1.png";
import Logo from "../../img/vitality.png";

const BACKEND = process.env.BACKEND_URL || "http://localhost:3001/api";

export const Login = () => {

  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const res = await fetch(`${BACKEND}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {

        const { user, token } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        actions.loginUser(user, token);

        Swal.fire({
          title: "Bienvenido",
          text: `Hola ${user.name}`,
          icon: "success",
          confirmButtonColor: "#7F56D9"
        }).then(() => {

       
          navigate("/menu", { replace: true });

        });

      } else {

        Swal.fire({
          title: "Error",
          text: data.error || "Credenciales incorrectas",
          icon: "error"
        });

      }

    } catch (error) {

      Swal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor",
        icon: "error"
      });

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

        <h3>Iniciar sesión</h3>

        <form onSubmit={handleSubmit} className="register-form">

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
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>

          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        <p className="switch-auth">
          ¿No tenés cuenta?{" "}
          <span onClick={() => navigate("/registro")}>
            Registrate
          </span>
        </p>

      </div>
    </div>
  );
};