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
      maintainers: [{ name: "fb" }, { name: "react-bot" }],
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

  it("returns 0 maintainers when maintainers is undefined", () => {
  // Arrange
  const input = {
    name: "react",
    versions: {
      "19.2.8": {},
    },
  };

  // Act
  const result = normalizeNpmPackage(input);

  // Assert
  expect(result.maintainers).toBe(0);
});
  it("keeps the description when it exists", () => {
  // Arrange
  const input = {
    name: "react",
    description: "React library",
    versions: {
      "19.2.8": {},
    },
    maintainers: [],
  };

  // Act
  const result = normalizeNpmPackage(input);

  // Assert
  expect(result.description).toBe("React library");
});