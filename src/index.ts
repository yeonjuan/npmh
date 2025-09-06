#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { spawn } from 'child_process';
import { getPackageJsonScripts } from './utils';

const program = new Command();

program
  .name('npmh')
  .description('Interactive npm script runner')
  .version('0.0.6');

async function runInteractiveScripts() {
  try {
    const scripts = getPackageJsonScripts();
    const scriptNames = Object.keys(scripts);

    if (scriptNames.length === 0) {
      console.log('No scripts found in package.json');
      return;
    }

    console.log('Available scripts:');
    scriptNames.forEach((name, index) => {
      console.log(`  ${index + 1}. ${name} - ${scripts[name]}`);
    });
    console.log('');

    const { selectedScript } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedScript',
        message: 'Select a script to run:',
        choices: scriptNames.map(name => ({
          name: `${name} - ${scripts[name]}`,
          value: name
        }))
      }
    ]);

    console.log(`\nRunning: npm run ${selectedScript}\n`);

    const child = spawn('npm', ['run', selectedScript], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.log(`\nScript exited with code ${code}`);
      }
    });

  } catch (error) {
    console.error('Error:', (error as Error).message);
    process.exit(1);
  }
}

program.action(runInteractiveScripts);

program.parse();