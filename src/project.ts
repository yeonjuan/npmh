import { existsSync, writeFileSync, readFileSync, unlinkSync } from 'fs';
import { resolve, basename } from 'path';
import { spawnSync } from 'child_process';

type PackageManager = 'npm' | 'yarn' | 'lerna';

export class Project {
  private packageJson: PackageJson = {};
  private manager: PackageManager = 'npm';

  constructor(readonly path: string) {
    this.path = path;
    if (this.hasFile('package.json')) {
      this.setupPackage();
    }
  }

  setupPackage(): void {
    this.packageJson = (JSON.parse(this.readFile('package.json')) ||
      {}) as PackageJson;
    this.manager = this.hasFile('yarn.lock') ? 'yarn' : 'npm';
  }

  getRunnableScripts(): string[] {
    return Object.keys(this.packageJson.scripts ?? {}).map(
      script => `${this.manager} run ${script}`,
    );
  }

  getAbsolutePath(relPath: string): string {
    return resolve(this.path, relPath);
  }

  hasFile(relPath: string): boolean {
    return existsSync(this.getAbsolutePath(relPath));
  }

  createFile(relPath: string, contents: string): void {
    const path = this.getAbsolutePath(relPath);

    writeFileSync(path, contents);
    if (basename(relPath) === 'package.json') {
      this.setupPackage();
    }
  }

  readFile(relPath: string): string {
    return this.hasFile(relPath)
      ? readFileSync(this.getAbsolutePath(relPath), 'utf-8')
      : '';
  }

  deleteFile(relPath: string): void {
    unlinkSync(this.getAbsolutePath(relPath));
  }

  exec(script: string): void {
    const [command, ...args] = script.split(' ');

    spawnSync(command, args, {
      stdio: 'inherit',
      cwd: this.path,
    });
  }
}

export function createProject(root: string): Project {
  return new Project(root);
}
