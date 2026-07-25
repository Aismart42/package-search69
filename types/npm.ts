export interface NpmPackageResponse {
  name: string;
  description?: string;

  versions: Record<string, unknown>;

  maintainers?: {
    name: string;
    email?: string;
  }[];
}
