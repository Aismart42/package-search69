import { describe, expect, it } from "vitest";
import { normalizeNpmPackage } from "@/lib/utils/npm";

describe("normalizeNpmPackage", () => {
  it("normalizes npm response", () => {
    const input = {
      name: "react",
      versions: {
        "19.2.8": {},
        "19.2.7": {},
      },
      maintainers: [
        { name: "fb" },
        { name: "react-bot" },
      ],
    };

    const result = normalizeNpmPackage(input);

    expect(result).toEqual({
      name: "react",
      description: null,
      versions: ["19.2.8", "19.2.7"],
      maintainers: 2,
    });
  });
});