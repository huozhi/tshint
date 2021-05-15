# tshint
> lightweight zero-config linter for typescript projects

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
    "lint": "tshint src/**/*.ts"
  }
}
```

Run lint with yarn scripts

```
yarn lint
```

### Included Presets

- eslint:recommended
- @typescript-eslint/recommended
- @typescript-eslint/recommended-requiring-type-checking

Without any styling related rules.

