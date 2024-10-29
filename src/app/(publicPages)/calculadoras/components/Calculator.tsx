import { ReactNode } from "react";
import styles from "./Calculator.module.scss";
import { useState } from "react";

interface CalculatorProps {
  title: string;
  inputs: ReactNode;
  result: number | null;
  onCalculate: () => void;
  resultUnit: string;
}

export default function Calculator({
  title,
  inputs,
  result,
  onCalculate,
  resultUnit,
}: CalculatorProps) {
  const [firstTry, setFirstTry] = useState(false);

  return (
    <div className={styles["calculator"]}>
      <h2>{title}</h2>
      <div className={styles["calculator-inputs"]}>
        {inputs}
        <button
          onClick={() => {
            setFirstTry(true);
            onCalculate();
          }}
        >
          Calcular
        </button>
      </div>
      {result == null ? (
        <>
          {firstTry && (
            <p className={styles["error-message"]}>
              Valores inválidos. Corrija-os e tente novamente!
            </p>
          )}
        </>
      ) : (
        <p>
          Resultado: {result} {resultUnit}
        </p>
      )}
    </div>
  );
}
