import { describe, expect, it } from "vitest";
import { PackageSchema } from "@/src/parser/package-schema";

describe("PackageSchema", () => {
  describe("valid cases", () => {
    it("accepts a valid package with name and version only", () => {
      const input = { name: "react", version: "19.2.4" };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
    });

    it("accepts a valid package with scripts", () => {
      const input = {
        name: "react",
        version: "19.2.4",
        scripts: { build: "next build", dev: "next dev" },
      };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("accepts a package with empty scripts object", () => {
      const input = { name: "lodash", version: "4.17.21", scripts: {} };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe("invalid cases", () => {
    it("rejects a package missing name", () => {
      const input = { version: "19.2.4" };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects a package missing version", () => {
      const input = { name: "react" };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects a non-string name", () => {
      const input = { name: 123, version: "1.0.0" };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects a non-string version", () => {
      const input = { name: "react", version: 123 };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects scripts that is not an object", () => {
      const input = { name: "react", version: "1.0.0", scripts: "not-an-object" };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("rejects scripts with non-string values", () => {
      const input = { name: "react", version: "1.0.0", scripts: { build: 123 } };
      const result = PackageSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});