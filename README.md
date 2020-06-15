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
$ helpn -s

? Select a script to run … 
❯ yarn run test
  yarn run start
  yarn run prepare-release
  yarn run test:dev-package
  // ...
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
