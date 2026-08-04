import { z } from "zod";

export const PackageSchema = z.object({
  name: z.string(),
  version: z.string(),
  scripts: z.record(z.string(), z.string()).optional(),
});

export type PackageData = z.infer<typeof PackageSchema>;