import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

const config = {
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  // requestMiddleware: (req: any) => {
  //   req.headers["Cache-Control"] = "stale-while-revalidate, max-age=3600"; // Cache for 1 hour, but update in the background
  //   return req;
  // },
  useCdn: false,
};

const standardClient = createClient({
  ...config,

  perspective: "published",
});

export { standardClient };
