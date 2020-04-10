import { sampleSources } from "./sample_sources";

export const sampleCategories = Array.from(
  new Set(sampleSources["sources"].map(source => source.category))
);
