"use client";

import { useState } from "react";
import Calculator from "./Calculator";

export default function ElectricForceCalculator() {
  const [charge1, setCharge1] = useState<string>("");
  const [charge2, setCharge2] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [force, setForce] = useState<number | null>(null);

  const calculateForce = () => {
    const k = 8.99 * Math.pow(10, 9); // Constante eletrostática em N·m²/C²
    const q1 = parseFloat(charge1);
    const q2 = parseFloat(charge2);
    const r = parseFloat(distance);
    if (!isNaN(q1) && !isNaN(q2) && !isNaN(r) && r !== 0) {
      const result = (k * q1 * q2) / (r * r);
      setForce(result);
    }
  };

  return (
    <Calculator
      title="Calculadora de Força Elétrica"
      inputs={
        <>
          <input
            type="number"
            placeholder="Carga 1 (C)"
            value={charge1}
            onChange={(e) => setCharge1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Carga 2 (C)"
            value={charge2}
            onChange={(e) => setCharge2(e.target.value)}
          />
          <input
            type="number"
            placeholder="Distância (m)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </>
      }
      result={force}
      onCalculate={calculateForce}
      resultUnit="N"
    />
  );
}
