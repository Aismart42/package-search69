import { readPackageFile } from "../parser/read-package";
import { parsePackage } from "../parser/parse-package";
import { validatePackage } from "../parser/validate-package";

import { detectLifecycleScripts } from "../detectors/lifecycle-detector";

import type { AnalysisReport } from "../types/report";

export async function analyzePackage(
    path: string
): Promise<AnalysisReport> {

    const content = await readPackageFile(path);

    const parsed = parsePackage(content);

    const pkg = validatePackage(parsed);

    const signals = detectLifecycleScripts(pkg);

    return {
        package: pkg.name,
        signals,
    };
}