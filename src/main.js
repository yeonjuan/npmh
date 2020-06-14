#!/usr/bin/env node
const cli = require("./cli");
const helpers = require("./helpers");

(async function init(args) {
  const cwd = process.cwd();

  const options = cli.parseArgv(args);

  if (options.help || args.slice(2).length === 0) {
    console.log(cli.generateHelp());
  }
  if (options.script) {
    helpers.run(cwd, "script");
  }

}(process.argv));
