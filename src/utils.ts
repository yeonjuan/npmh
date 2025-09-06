import { readFileSync } from 'fs';
import { join } from 'path';

export interface PackageJson {
  scripts?: Record<string, string>;
}

export function getPackageJsonScripts(cwd: string = process.cwd()): Record<string, string> {
  try {
    const packageJsonPath = join(cwd, 'package.json');
    const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    
    return packageJson.scripts || {};
  } catch (error) {
    throw new Error('package.json not found or invalid');
  }
}