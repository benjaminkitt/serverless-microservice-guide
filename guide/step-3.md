# Add Typescript support

Next, you're going to add [Typescript](https://www.typescriptlang.org/) to the project. Typescript is a typed superset of JavaScript that brings several
advantages including:

* Static Type-checking
* ES6 feature support
* Advanced editor features, like autocomplete

## Install and configure typescript

```
npm install -g typescript@next
npm install --save-dev typescript@next
```

Installing globally provides access to the typescript cli. Installing in the
project ensures we track Typescript as a dependency and makes it available for
CI servers.

Create a `tsconfig.json` file in the project root and include the
following:

```json
{
  "compilerOptions": {
    "target": "es6",
    "rootDir": ".",
    "module": "commonjs",
    "moduleResolution": "node",
    "noImplicitAny": true,
    "removeComments": true,
    "inlineSourceMap": true,
    "inlineSources": true,
    "pretty": true
  },
  "filesGlob": [
    "functions/**/*.ts"
  ],
  "include": [
    "functions/**/*.ts"
  ]
}
```

## Install and configure typings

[Typings](https://github.com/typings/typings) is a tool to install and manage
TypeScript definitions.

```
npm install --save-dev typings
```

Next, install the TypeScript defintions for Node.js 4.

```
typings install --save --global dt~node-4
```

Add `"typings/index.d.ts"` to the `filesGlob` and `include` arrays in
your `tsconfig.json`. They should look like this:

```json
"filesGlob": [
  "functions/**/*.ts",
  "typings/index.d.ts"
],
"include": [
  "functions/**/*.ts",
  "typings/index.d.ts"
]
```

# Migrate function to typescript

Rename `handler.js` in your urlToMd directory to `handler.ts`. As Typescript is
a superset of JavaScript, you can immediately compile `handler.ts` to JavaScript
(albeit with a few errors.) Try running `tsc` from your project root to compile.
