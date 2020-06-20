<p align="center">
  <p align="center">
    <img src='./npmh.png' alt='npmh' height='72px'>
  </p>
  <p align="center">
    npm command-line helper
  </p>
</p>

## Installation

```bash
npm install -g npmh
```

## Usage

### `-s`, `--script`

Print and select the runnable script in "package.json" on prompt and run it.

```bash
$ npmh -s

? Select a script to run …
❯ yarn run test
  yarn run start
  yarn run prepare-release
  yarn run test:dev-package
  // ...
```

### `-i`, `--init`

Initialize some non exists files needed in the project.

- package.json
- .gitignore
- (TODO) README.md
- (TODO) .eslintrc

```bash
$ npmh -i

✔ creates .gitignore? (Y/n) · true
✔ creates package.json? (Y/n) · true
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
