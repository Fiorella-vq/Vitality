const BACKEND = process.env.BACKEND_URL || "http://localhost:3001/api";

const getState = ({ getStore, getActions, setStore }) => {
  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  };

  return {
    store: {
      message: null,
      user: loadUserFromLocalStorage(),
      name: loadUserFromLocalStorage()?.name || null,
      token: localStorage.getItem("token") || null,
    },

    actions: {
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      loginUser: (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setStore({ user, name: user.name, token });
      },

      logoutUser: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setStore({ user: null, name: null, token: null });
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
            setStore({ user: data.user, name: data.user.name, token });
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            getActions().logoutUser();
          }
        } catch {
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
        } catch {
          alert("Error en login, revisa la consola");
        }
      },
    },
  };
};

export default getState;