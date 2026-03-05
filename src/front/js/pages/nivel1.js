import React from "react";
import { Niveles } from "../component/niveles";

export const Nivel1 = () => {
  return (
    <Niveles
      title="Nivel 1"
      totalDays={7}
      nextLevel="/Nivel2"
      storageKey="nivel1"
    />
  );
};