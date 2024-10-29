"use client";

import { useState } from "react";
import Calculator from "./Calculator";

export default function ElectricPotentialCalculator() {
  const [charge, setCharge] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [potential, setPotential] = useState<number | null>(null);

  const calculatePotential = () => {
    const k = 8.99 * Math.pow(10, 9); // Constante eletrostática em N·m²/C²
    const q = parseFloat(charge);
    const r = parseFloat(distance);
    if (!isNaN(q) && !isNaN(r) && r !== 0) {
      const result = (k * q) / r;
      setPotential(result);
    }
  };

  return (
    <Calculator
      title="Calculadora de Potencial Elétrico"
      inputs={
        <>
          <input
            type="number"
            placeholder="Carga (C)"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          />
          <input
            type="number"
            placeholder="Distância (m)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </>
      }
      onCalculate={calculatePotential}
      result={potential}
      resultUnit="V"
    />
  );
}
