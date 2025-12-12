import { readdir, readFile, stat } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { PackageJson } from "./types";

function matchesPattern(path: string, pattern: string): boolean {
  if (pattern.includes("*")) {
    const regex = pattern.replace(/\*/g, ".*");
    return new RegExp(`^${regex}$`).test(path);
  }
  return path === pattern;
}

export async function findPackageJsonsInDirectory(
  dir: string,
  patterns: string[],
  rootPath: string,
): Promise<string[]> {
  const packages: string[] = [];

  try {
    const entries = await readdir(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const relativePath = fullPath.replace(rootPath + "/", "");
      const fileStat = await stat(fullPath);
      if (fileStat.isDirectory()) {
        const packageJsonPath = join(fullPath, "package.json");

        if (existsSync(packageJsonPath)) {
          if (
            patterns.some((pattern) => matchesPattern(relativePath, pattern))
          ) {
            packages.push(packageJsonPath);
          }
        }

        if (!entry.startsWith(".") && !entry.startsWith("node_modules")) {
          packages.push(
            ...(await findPackageJsonsInDirectory(
              fullPath,
              patterns,
              rootPath,
            )),
          );
        }
      }
    }
  } catch (error) {
    // Directory not accessible, skip
  }

  return packages;
}

export async function loadPackageJson(cwd: string) {
  try {
    const packageJsonPath = join(cwd, "package.json");
    const packageJsonContent = await readFile(packageJsonPath, "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    return packageJson;
  } catch (error) {
    throw new Error("package.json not found or invalid");
  }
}
