import { packageSchema } from "./package-schema";

export function validatePackage(data: unknown) {
  return packageSchema.parse(data);
}