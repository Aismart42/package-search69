import type { PackageData } from "../parser/package-schema";
import type { TrustSignal, Severity } from "../types/signal";

const lifecycleRules: Record<
  string,
  { signal: string; severity: Severity }
> = {
  preinstall: {
    signal: "preinstall_script_detected",
    severity: "high",
  },
  install: {
    signal: "install_script_detected",
    severity: "medium",
  },
  postinstall: {
    signal: "postinstall_script_detected",
    severity: "high",
  },
  prepare: {
    signal: "prepare_script_detected",
    severity: "medium",
  },
};

export function detectLifecycleScripts(
  pkg: PackageData
): TrustSignal[] {
  const signals: TrustSignal[] = [];

  if (!pkg.scripts) {
    return signals;
  }

  for (const [scriptName, rule] of Object.entries(lifecycleRules)) {
    if (pkg.scripts[scriptName]) {
      signals.push({
        name: rule.signal,
        severity: rule.severity,
      });
    }
  }

  return signals;
}