import { PackageSchema } from "./package-schema";

export function validatePackage(data: unknown) {
  return PackageSchema.parse(data);
}