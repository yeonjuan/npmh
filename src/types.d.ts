interface PackageJson {
  name?: string;
  version?: string;
  scripts?: {
    [command in string]: string;
  };
  license?: string;
}

declare module 'enquirer' {
  interface Config {
    message?: string;
    name?: string;
    choices?: { name: string; message: string }[];
  }

  export class Select<T> {
    constructor(option: Config);
    run(): Promise<T>;
  }
}
