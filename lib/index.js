#!/usr/bin/env node

const fs = require('fs')
const arg = require('arg')
const { ESLint } = require('eslint')
const { createLintConfig } = require('./config')

function getCwdFile(cwd, filename) { return `${cwd}/${filename}` }

function loadGitIgnores(cwd) {
  const gitignorePath = getCwdFile(cwd, '.gitignore')
  const ignores = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath, { 'encoding': 'utf-8' }).replace(/\r\n/g,'\n').split('\n').filter(s => s && !s.startsWith('#'))
    : []
  return ignores
}

function loadPackageJson(cwd) {
  const pkgJsonPath = getCwdFile(cwd, 'package.json')
  return fs.existsSync(pkgJsonPath)
    ? JSON.parse(fs.readFileSync(pkgJsonPath, { 'encoding': 'utf-8' }))
    : {}
}

function resolveTsConfigPath(cwd) {
  const tsConfigPath = `${cwd}/tsconfig.json`
  return fs.existsSync(tsConfigPath) ? tsConfigPath : null
}

async function main() {
  const args = arg({ '--fix': Boolean }, { argv: process.argv.slice(2) })
  const cwd = process.cwd()
  
  const files = args._.length ? args._ : ['./**/*.ts']
  const withFixes = args['--fix']
  const gitignores = loadGitIgnores(cwd)
  const tsConfigPath = resolveTsConfigPath(cwd)
  const { eslintConfig } = loadPackageJson(cwd)
  const useTypescript = files.some(pattern => pattern.endsWith('ts'))

  if (eslintConfig != null) {
    console.log('Custom eslint configurations from package.json is loaded')
  }
  const lintConfig = createLintConfig(eslintConfig, { useTypescript })

  lintConfig.ignorePatterns.push(...gitignores)
  if (useTypescript && !tsConfigPath) {
    throw new Error('Please provide `tsconfig.json` to include your source files')
  }
  
  const engine = new ESLint({
    cwd,
    extensions: ['.js', '.ts'],    
    baseConfig: lintConfig,
    useEslintrc: false,
    cache: false,
  })
  const results = await engine.lintFiles(files)
  if (withFixes) {
    await ESLint.outputFixes(results)
  }
  
  const formatter = await engine.loadFormatter()
  const resultText = formatter.format(results)
  console.log(resultText)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
