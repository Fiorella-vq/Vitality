import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Nivel1 } from "./pages/nivel1";
import { Nivel2 } from "./pages/nivel2";
import { Nivel3 } from "./pages/nivel3";
import injectContext from "./store/appContext";

// import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Registro } from "./component/registro";
import { Login } from "./component/login";
import { Principal } from "./component/menu";
import { Niveles } from "./component/niveles";


const FooterWrapper = () => {
  const location = useLocation();
  return location.pathname === "/menu" ? <Footer /> : null;
};

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
            <Route element={<Principal />} path="/menu" />  
              <Route element={<Niveles />} path="/niveles" />
            <Route element={<Nivel1 />} path="/Nivel1" />
            <Route element={<Nivel2 />} path="/Nivel2" />
            <Route element={<Nivel3 />} path="/Nivel3" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>

          <FooterWrapper />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);