import { describe, expect, it } from "vitest";
import { detectLifecycleScripts } from "@/src/detectors/lifecycle-detector";

describe("detectLifecycleScripts", () => {
  it("returns an empty array when scripts is undefined", () => {
    const pkg = { name: "my-pkg", version: "1.0.0" };
    expect(detectLifecycleScripts(pkg)).toEqual([]);
  });

  it("returns an empty array when scripts is an empty object", () => {
    const pkg = { name: "my-pkg", version: "1.0.0", scripts: {} };
    expect(detectLifecycleScripts(pkg)).toEqual([]);
  });

  it("detects preinstall as high severity", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: { preinstall: "echo hello" },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([
      { name: "preinstall_script_detected", severity: "high" },
    ]);
  });

  it("detects install as medium severity", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: { install: "echo hello" },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([
      { name: "install_script_detected", severity: "medium" },
    ]);
  });

  it("detects postinstall as high severity", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: { postinstall: "echo hello" },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([
      { name: "postinstall_script_detected", severity: "high" },
    ]);
  });

  it("detects prepare as medium severity", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: { prepare: "echo hello" },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([
      { name: "prepare_script_detected", severity: "medium" },
    ]);
  });

  it("detects all lifecycle scripts in rule order", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: {
        preinstall: "node script.js",
        install: "node script.js",
        postinstall: "node script.js",
        prepare: "node script.js",
      },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([
      { name: "preinstall_script_detected", severity: "high" },
      { name: "install_script_detected", severity: "medium" },
      { name: "postinstall_script_detected", severity: "high" },
      { name: "prepare_script_detected", severity: "medium" },
    ]);
  });

  it("ignores non-lifecycle scripts", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: {
        build: "next build",
        test: "vitest",
        lint: "eslint .",
      },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([]);
  });

  it("detects lifecycle scripts while ignoring non-lifecycle ones", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: {
        build: "next build",
        preinstall: "echo hello",
        postinstall: "echo world",
        test: "vitest",
      },
    };
    expect(detectLifecycleScripts(pkg)).toEqual([
      { name: "preinstall_script_detected", severity: "high" },
      { name: "postinstall_script_detected", severity: "high" },
    ]);
  });

  it("detects scripts with empty string values", () => {
    const pkg = {
      name: "my-pkg",
      version: "1.0.0",
      scripts: {
        preinstall: "",
      },
    };
    expect(detectLifecycleScripts(pkg)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "preinstall_script_detected", severity: "high" }),
      ])
    );
  });
});