const GIT_IGNORES = [
  {
    description: "OS",
    files: [
      ".DS_Store",
      ".DS_Store?",
      "._*",
      ".Trashes",
      "ehthumbs.db",
      "Thumbs.db"
    ]
  },
  {
    description: "dependencies",
    files: [
      "node_modules/"
    ]
  },
  {
    description: "logs",
    files: [
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "lerna-debug.log*",
      "logs"
    ]
  },
  {
    description: "coverage",
    files: [
      "coverage",
      "*.lcov",
      ".nyc_output/"
    ]
  },
  {
    description: "IDE",
    files: [
      ".idea",
      ".project",
      ".vscode",
      "*.sublime-workspace",
      "*.swp",
      "*.swo",
      ".settings",
      ".buildpath"
    ]
  }
];

module.exports = function initGitignore(project) {
  project.createFile(
    ".gitignore",
    GIT_IGNORES.map(({ description, files }) => (
      `# ${description}\n${files.join("\n")}\n`
    )).join("\n")
  );
};
