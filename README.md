# npmh

Interactive npm script runner with monorepo support.

## Installation

```bash
npm install -g npmh
```

## Usage

Run in any directory with `package.json`:

```bash
npmh
```

## Features

- Interactive script selection
- Auto-detects package manager (npm/yarn/pnpm)
- Supports monorepo/workspaces
- Cross-platform compatible

## Example

```bash
$ npmh
? Select a script to run:
o build - tsc
  start - node dist/index.js
  dev - tsc && node dist/index.js
```

For monorepos, first select workspace, then script.

## LICENSE

MIT
