#!/usr/bin/env node

import { Command } from "commander";
import { runScripts } from "./commands";
import { version } from "../package.json";

const program = new Command();

program
  .name("npmh")
  .description("Interactive npm script runner")
  .version(version);

program.action(runScripts);

program.parse();
