#!/usr/bin/env node

import { Command } from "commander";
import { runScripts } from "./commands";

const program = new Command();

program
  .name("npmh")
  .description("Interactive npm script runner")
  .version("0.0.6");

program.action(runScripts);

program.parse();
