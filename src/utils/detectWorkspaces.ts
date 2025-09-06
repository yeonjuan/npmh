import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import type { PackageJson } from "../types";

export interface WorkspaceInfo {
  name: string;
  path: string;
  scripts: Record<string, string>;
}

export function isMonorepo(rootPackageJson: PackageJson): boolean {
  return !!rootPackageJson.workspaces;
}

export function getWorkspacePatterns(rootPackageJson: PackageJson): string[] {
  if (!rootPackageJson.workspaces) {
    return [];
  }

  if (Array.isArray(rootPackageJson.workspaces)) {
    return rootPackageJson.workspaces;
  }

  return rootPackageJson.workspaces.packages || [];
}

function matchesPattern(path: string, pattern: string): boolean {
  if (pattern.includes("*")) {
    const regex = pattern.replace(/\*/g, ".*");
    return new RegExp(`^${regex}$`).test(path);
  }
  return path === pattern;
}

function findPackagesInDirectory(
  dir: string,
  patterns: string[],
  rootPath: string,
): string[] {
  const packages: string[] = [];

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const relativePath = fullPath.replace(rootPath + "/", "");

      if (statSync(fullPath).isDirectory()) {
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
            ...findPackagesInDirectory(fullPath, patterns, rootPath),
          );
        }
      }
    }
  } catch (error) {
    // Directory not accessible, skip
  }

  return packages;
}

export function getWorkspacePackages(
  rootPath: string = process.cwd(),
): WorkspaceInfo[] {
  const rootPackageJsonPath = join(rootPath, "package.json");

  if (!existsSync(rootPackageJsonPath)) {
    return [];
  }

  const rootPackageJson: PackageJson = JSON.parse(
    readFileSync(rootPackageJsonPath, "utf-8"),
  );

  if (!isMonorepo(rootPackageJson)) {
    return [];
  }

  const patterns = getWorkspacePatterns(rootPackageJson);
  const workspaces: WorkspaceInfo[] = [];

  const packagePaths = findPackagesInDirectory(rootPath, patterns, rootPath);

  for (const packagePath of packagePaths) {
    try {
      const packageJson: PackageJson = JSON.parse(
        readFileSync(packagePath, "utf-8"),
      );

      const workspacePath = packagePath.replace("/package.json", "");
      const name =
        packageJson.name || workspacePath.split("/").pop() || "unknown";

      workspaces.push({
        name,
        path: workspacePath,
        scripts: packageJson.scripts || {},
      });
    } catch (error) {
      console.warn(`Warning: Could not parse ${packagePath}`);
    }
  }

  return workspaces;
}
