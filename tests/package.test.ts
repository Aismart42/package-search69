import { describe, expect, it } from "vitest";
import { getLatestVersion } from "@/lib/utils/package";
import { PackageSchema } from "@/lib/validations/package";


describe("getLatestVersion", () => {
  it("returns the latest version when versions exist", () => {
  // Arrange
  const versions = [
    { version: "19.2.8" },
    { version: "19.2.7" },
    { version: "18.3.1" },
  ];

  // Act
  const result = getLatestVersion(versions);

  // Assert
  expect(result).toBe("19.2.8");
});

  it("returns null when no versions exist", () => {
    expect(getLatestVersion([])).toBeNull();
  });

  it("returns the only version when the array has one item", () => {
    // Arrange
    const versions = [{ version: "1.0.0" }];

    // Act
    const result = getLatestVersion(versions);

    // Assert
    expect(result).toBe("1.0.0");
  });
});

  it("accepts a valid package", () => {
  // Arrange
  const input = {
    name: "react",
    description: "React library",
    versions: ["19.2.8", "19.2.7"],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(true);
});

  it("rejects a package without a name", () => {
  // Arrange
  const input = {
    description: "React library",
    versions: ["19.2.8"],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(false);
});

  it("rejects a package when name is not a string", () => {
  // Arrange
  const input = {
    name: 123,
    description: "React library",
    versions: ["19.2.8"],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(false);
});

  it("accepts a package without description", () => {
  // Arrange
  const input = {
    name: "react",
    versions: ["19.2.8"],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(true);
});

  it("accepts a package without versions", () => {
  // Arrange
  const input = {
    name: "react",
    description: "React library",
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(true);
});

  it("rejects invalid versions", () => {
  // Arrange
  const input = {
    name: "react",
    versions: [1, 2, 3],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(false);
});

  it("rejects an empty package name", () => {
  // Arrange
  const input = {
    name: "",
    description: "React library",
    versions: ["19.2.8"],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(false);
});

  it("rejects a package name longer than 100 characters", () => {
  // Arrange
  const input = {
    name: "a".repeat(101),
    description: "React library",
    versions: ["19.2.8"],
  };

  // Act
  const result = PackageSchema.safeParse(input);

  // Assert
  expect(result.success).toBe(false);
});