import { Select } from 'enquirer';
import { dim, bold } from 'colors';
import { Project } from '../project';

interface Answers {
  script: string;
}

function stylingScriptMessage(script: string): string {
  const scripts = script.split(' ');
  const prefixed = script.slice(0, script.lastIndexOf(' '));
  const command = scripts[scripts.length - 1];

  return `${dim(prefixed)} ${bold(command)}`;
}

function askScriptToRun(scripts: string[]): Promise<Answers> {
  return new Select<Answers>({
    message: 'Select a script to run',
    name: 'script',
    choices: scripts.map(script => ({
      name: script,
      message: stylingScriptMessage(script),
    })),
  }).run();
}

export default async function run(project: Project): Promise<void> {
  const runnableScripts = project.getRunnableScripts();
  const { script } = await askScriptToRun(runnableScripts);

  project.exec(script);
}
