export { getPackageJson } from "./getPackageJson";
export { getRunCommand, type ScriptTarget } from "./getRunCommand";
export { detectPackageManager } from "./detectPackageManager";
export {
  isMonorepo,
  getWorkspacePackages,
  type WorkspaceInfo,
} from "./detectWorkspaces";
