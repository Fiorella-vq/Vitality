import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

// import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Registro } from "./component/registro";
import { Login } from "./component/login";

// Helper component para renderizar Footer condicionalmente
const FooterWrapper = () => {
  const location = useLocation();
  return location.pathname === "/" ? <Footer /> : null;
};

// Layout principal
const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* <Navbar /> */}
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Registro />} path="/registro" />
            <Route element={<Login />} path="/login" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>

          {/* Footer solo en "/" */}
          <FooterWrapper />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);