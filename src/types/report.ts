import type { TrustSignal } from "./signal";

export interface AnalysisReport {
    package : string;
    signals : TrustSignal[]
}
