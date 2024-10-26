import Simulator from "@/app/types/Simulator";
import SimulatorCard from "./components/SimulatorCard";
import styles from "./page.module.scss";
import { fetchSimulators } from "@/app/actions/simulatorActions";

export const metadata = {
  title: "Simuladores",
  description: "Página dos simuladores",
};

export default async function SimulatorsPage() {
  const simulators = await fetchSimulators();
  console.log(simulators);

  return (
    <div className={styles.page}>
      <h1>Simuladores</h1>
      <div>
        {simulators ? (
          <>
            <p>Obs: os simuladores a seguir são de terceiros.</p>
            <div className={styles["simulator-grid"]}>
              {simulators.map((simulator: Simulator) => {
                return (
                  <SimulatorCard key={simulator.url} simulator={simulator} />
                );
              })}
            </div>
          </>
        ) : (
          <p>Nenhum simulador encontrado.</p>
        )}
      </div>
    </div>
  );
}
