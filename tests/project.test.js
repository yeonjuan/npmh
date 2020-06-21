const { createProject } = require("../src/project");
const { getFixtures } = require("./test-utils");

const yarnProjFixture = getFixtures("yarn-project");
const npmProjFixture = getFixtures("npm-project");

describe("Project", () => {
  let yarnProject = null;
  let npmProject = null;

  beforeAll(() => {
    yarnProject = createProject(yarnProjFixture);
    npmProject = createProject(npmProjFixture);
  });

  describe("getRunnableScripts", () => {
    it("should return runnable npm scripts in project", () => {
      expect(npmProject.getRunnableScripts()).toEqual([
        "npm run foo",
        "npm run bar",
      ]);

      expect(yarnProject.getRunnableScripts()).toEqual([
        "yarn run foo",
        "yarn run bar",
      ]);
    });
  });
});
