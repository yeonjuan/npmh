import { NpmManager } from "./npmManager";
import { PnpmManager } from "./pnpmManager";
import { YarnManager } from "./yarnManager";

export type AnyPackageManager = NpmManager | PnpmManager | YarnManager;

export interface PackageJson {
  name: string;
  version: string;
  workspaces?: string[];
  packageManager?: string;
  scripts?: Record<string, string>;
}

export interface Package {
  path: string;
  packageJson: PackageJson;
}

export enum PackageManagerType {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
}
