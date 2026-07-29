export function getLatestVersion(versions: { version: string }[]) {
  return versions.at(0)?.version ?? null;
}
