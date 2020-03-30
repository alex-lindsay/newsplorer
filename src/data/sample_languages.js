import { sampleSources } from "./sample_sources";

export const sampleLanguages = Array.from(
  new Set(sampleSources["sources"].map(source => source.language))
);
