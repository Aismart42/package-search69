import { describe, expect, it } from "vitest";
import { getLatestVersion } from "@/lib/utils/package";

describe("getLatestVersion", () => {
  it("returns the latest version when versions exist", () => {
    const versions = [
      { version: "19.2.8" },
      { version: "19.2.7" },
      { version: "18.3.1" },
    ];

    expect(getLatestVersion(versions)).toBe("19.2.8");
  });

  it("returns null when no versions exist", () => {
    expect(getLatestVersion([])).toBeNull();
  });
});