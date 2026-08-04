export type Severity =
| "low"
| "medium"
| "high"
| "critical"

export interface TrustSignal {
    name : string;
    severity : Severity
}