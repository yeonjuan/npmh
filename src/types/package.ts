export interface PackageJson {
  scripts?: Record<string, string>;
  packageManager?: string;
  workspaces?: string[] | { packages: string[] };
  name?: string;
}

export enum PackageManager {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
}
