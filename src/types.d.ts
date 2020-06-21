interface PackageJson {
  name?: string;
  version?: string;
  scripts?: {
    [command in string]: string;
  };
  license?: string;
}

type PackageManager = "npm" | "yarn";
