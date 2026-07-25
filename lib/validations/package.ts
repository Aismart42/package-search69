import { z } from "zod";

export const PackageSchema = z.object({
  name: z
    .string()
    .min(1, "Package name is required")
    .max(100, "Package name is too long"),

  description: z.string().max(500, "Description is too long").optional(),

  versions: z.array(z.string()).optional(),
});
