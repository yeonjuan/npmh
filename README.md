# npmh

npm command-line helper

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

* (TODO) package.json
* .gitignore
* (TODO) README.md
* (TODO) .eslintrc

```bash
$ npmh -i

? creates .gitignore? (Y/n) › true
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
