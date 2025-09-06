import { readFileSync } from "fs";
import { join } from "path";
import type { PackageJson } from "../types";

/**
 * Reads and parses the package.json file in the given directory.
 * @param cwd - Current working directory, defaults to process.cwd()
 * @returns {PackageJson} - The parsed package.json content
 * @throws Will throw an error if package.json is not found or invalid
 */
export function getPackageJson(cwd: string = process.cwd()): PackageJson {
  try {
    const packageJsonPath = join(cwd, "package.json");
    const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    return packageJson;
  } catch (error) {
    throw new Error("package.json not found or invalid");
  }
}
