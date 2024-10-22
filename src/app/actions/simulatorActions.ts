import Simulator from "../types/Simulator";
import { standardClient } from "@/sanity/client";

export async function fetchSimulators(): Promise<Simulator[]> {
  const query = `*[_type == "simulator"]{
      title,
      url,
      description,
      image,
    }`;

  const simulators = await standardClient.fetch(
    query,
    {},
    { cache: "no-store" }
  );

  return simulators;
}
