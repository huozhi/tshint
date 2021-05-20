# tshint
> super simple and lightweight zero-config linter for ts and js projects.

### Intro

tshint is a zero-config linter based on eslint, with all the recommended rules built inside. By default, the base presets include

- `eslint:recommended`
- `@typescript-eslint/recommended`
- `@typescript-eslint/recommended-requiring-type-checking`

### Install

install tshint along with `typescript`
```
yarn add -D tshint typescript
```

### Usage

Configure in package.json

```json
{
  "scripts": {
    "lint": "tshint",
    "lint:fix": "tshint --fix", // lint and apply fixes
    "lint:src": "tshint src/**/*" // lint specific files
  }
}
```

Run lint with yarn scripts

```
yarn lint
```

#### Command Line Arguments

`--fix`: apply fixes onto the files

#### Custom Eslint Configurations

Eslint config fields `extends`, `plugins` and `rules` are available to be configured in `eslintConfig` field from `package.json`.
They will be merged with default rules in tshint. 

package.json
```json
{
  "eslintConfig": {
    "plugins": [
      "jest"
    ],
    "extends": [
      "plugin:jest/recommended"
    ]
  }
}
```

