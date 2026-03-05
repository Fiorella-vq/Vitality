import React from "react";
import { Niveles } from "../component/niveles";

export const Nivel2 = () => {
  return (
    <Niveles
      title="Nivel 2"
      totalDays={7}
      nextLevel="/Nivel3"
      storageKey="nivel2"
    />
  );
};