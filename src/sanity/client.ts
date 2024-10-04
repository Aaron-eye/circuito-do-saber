import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

const config = {
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: true,
};

const standardClient = createClient({
  ...config,

  perspective: "published",
});

export { standardClient };
