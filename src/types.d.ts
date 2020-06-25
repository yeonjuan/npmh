interface PackageJson {
  name?: string;
  version?: string;
  scripts?: {
    [command in string]: string;
  };
  license?: string;
}

type PackageManager = 'npm' | 'yarn' | 'lerna';

declare module 'enquirer' {
  interface EnquirerOption {
    message?: string;
    name?: string;
    choices?: { name: string; message: string }[];
  }

  export class Select<T> {
    constructor(option: EnquirerOption);
    run(): Promise<T>;
  }
}
