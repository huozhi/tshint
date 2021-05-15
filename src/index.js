#!/usr/bin/env node

const fs = require('fs')
const arg = require('arg')
const { ESLint } = require('eslint')
const lintConfig = require('./config')

function getGitIgnores(cwd) {
  const gitignorePath = `${cwd}/.gitignore`
  const ignores = fs.existsSync(gitignorePath)
    ? fs.readFileSync(gitignorePath).toString().replace(/\r\n/g,'\n').split('\n').filter(s => s && !s.startsWith('#'))
    : []
  return ignores
}

function resolveTsConfigPath(cwd) {
  const tsConfigPath = `${cwd}/tsconfig.json`
  return fs.existsSync(tsConfigPath) ? tsConfigPath : undefined
}

async function main() {
  const args = arg({ '--fix': Boolean }, { argv: process.argv.slice(2) })
  
  const cwd = process.cwd()
  const files = args._ || '.'
  const withFixes = args['--fix']
  
  const gitignores = getGitIgnores(cwd)
  const tsConfigPath = resolveTsConfigPath(cwd)
  
  lintConfig.ignorePatterns.push(...gitignores)
  if (!tsConfigPath) {
    // throw new Error('Please provide `tsconfig.json` to include your source files')
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
