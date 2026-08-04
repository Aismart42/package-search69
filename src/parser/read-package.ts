import { readFile } from "node:fs/promises";

export async function readPackageFile(path: string): Promise<string> {
    return readFile(path, "utf-8")
}