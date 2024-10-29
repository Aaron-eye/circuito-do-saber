"use client";

import { useState } from "react";
import Calculator from "./Calculator";
import { on } from "events";

export default function ElectricFieldCalculator() {
  const [charge, setCharge] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [field, setField] = useState<number | null>(null);

  const calculateField = () => {
    const k = 8.99 * Math.pow(10, 9); // Constante eletrostática em N·m²/C²
    const q = parseFloat(charge);
    const r = parseFloat(distance);
    if (!isNaN(q) && !isNaN(r) && r !== 0) {
      const result = (k * q) / (r * r);
      setField(result);
    }
  };

  return (
    <Calculator
      title="Calculadora de Campo Elétrico"
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
      onCalculate={calculateField}
      result={field}
      resultUnit="N/C"
    />
  );
}
