import React from "react";
import { Niveles } from "../component/niveles";

export const Nivel3 = () => {
  return (
    <Niveles
      title="Nivel 3"
      totalDays={7}
      nextLevel={null}
      storageKey="nivel3"
    />
  );
};