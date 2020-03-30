import { sampleSources } from "./sample_sources";

export const sampleCountries = Array.from(
  new Set(sampleSources["sources"].map(source => source.country))
);
