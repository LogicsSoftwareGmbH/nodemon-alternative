#!/usr/bin/env node

import { createWatcher } from '../src/index.js';
import path from 'path';

const args = process.argv.slice(2);
let configPath = './nodemon-alternative.json';

// Handle basic CLI arguments
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
nodemon-alternative

Usage:
  nodemon-alternative [options]

Options:
  --config, -c    Path to config file (default: ./nodemon-alternative.json)
  --help, -h      Show this help message
  --version, -v   Show version number

Example:
  nodemon-alternative --config ./my-config.json
`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const packageJson = JSON.parse(await import('../package.json', { assert: { type: 'json' }}));
  console.log(`nodemon-alternative v${packageJson.version}`);
  process.exit(0);
}

// Handle config file path
const configIndex = args.findIndex(arg => arg === '--config' || arg === '-c');
if (configIndex !== -1 && args[configIndex + 1]) {
  configPath = path.resolve(args[configIndex + 1]);
}

// Start the watcher
const watcher = createWatcher(configPath);
watcher.start();
