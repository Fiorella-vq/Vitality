const BACKEND = process.env.BACKEND_URL || "http://localhost:3001/api";

const getState = ({ getStore, getActions, setStore }) => {
  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.warn("Error parsing user from localStorage:", error);
      return null;
    }
  };

  return {
    store: {
      message: null,
      user: loadUserFromLocalStorage(),
      token: localStorage.getItem("token") || null,
    },

    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

    
      loginUser: (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setStore({ user, token });
      },

     
      logoutUser: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setStore({ user: null, token: null });
        window.location.href = "/";
      },

     
      loadUserFromToken: async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          const res = await fetch(`${BACKEND}/usuario`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) {
            getActions().logoutUser();
            return;
          }

          const data = await res.json();

          if (data.user) {
            setStore({ user: data.user, token });
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            getActions().logoutUser();
          }
        } catch (error) {
          console.error("Error cargando usuario:", error);
          getActions().logoutUser();
        }
      },

     
      loginFetch: async (email, password) => {
        try {
          const response = await fetch(`${BACKEND}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json().catch(() => ({}));

          if (response.ok) {
            getActions().loginUser(data.user, data.token);
            window.location.href = "/usuarioPages";
          } else {
            alert(data.error || data.message || "Error en login");
          }
        } catch (error) {
          console.error("Error en login:", error);
          alert("Error en login, revisa la consola");
        }
      },
    },
  };
};

export default getState;
