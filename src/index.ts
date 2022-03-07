#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// hideBin is shorthand for process.argv.slice(2)
// It takes into account variations in some environments, i.e. Electron
yargs(hideBin(process.argv))
  .commandDir('commands')
  // Any command-line argument given that is not demanded, or does not
  // have a corresponding description, will be reported as an error.
  .strict().argv;
