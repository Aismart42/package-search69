import type { NpmPackageResponse } from "@/types/npm";

export function normalizeNpmPackage(data: NpmPackageResponse) {
  return {
    name: data.name,
    description: data.description ?? null,

    versions: Object.keys(data.versions),

    maintainers: data.maintainers?.length ?? 0,
  };
}