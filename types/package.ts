export interface PackageResponse {
  id: number;
  name: string;
  description: string | null;

  versions: {
    id: number;
    version: string;
    packageId: number;
  }[];
}
