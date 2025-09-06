export interface PackageJson {
  scripts?: Record<string, string>;
  packageManager?: string;
}

export enum PackageManager {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
}
