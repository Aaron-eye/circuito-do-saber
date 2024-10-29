import styles from "./page.module.scss";
import ElectricForceCalculator from "./components/ElectricForceCalculator";
import ElectricFieldCalculator from "./components/ElectricFieldCalculator";
import ElectricPotentialCalculator from "./components/ElectricPotentialCalculator";

export default function Calculators() {
  return (
    <div className={styles.page}>
      <h1>Calculadoras Elétricas</h1>
      <div className={styles["calculators-grid"]}>
        <ElectricForceCalculator />
        <ElectricFieldCalculator />
        <ElectricPotentialCalculator />
      </div>
    </div>
  );
}
