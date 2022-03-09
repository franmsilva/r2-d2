#!/usr/bin/env zx
console.log(chalk.blue('🔨 Initiating build... \n'));

// Delete old build
fs.emptyDirSync('./build');

// Build project
try {
  await $`tsc -b`
  console.log(chalk.green(`✔ tsc build successful \n`))
} catch (error) {
  // TODO: Need to exit with non-zero code
  console.log(chalk.redBright(`tsc build failed with exit code ${error.exitCode} 😭`))
}

// Copy templates to build directory
fs.ensureDirSync('./build/templates')
fs.copySync('./src/templates', './build/templates')

console.log(chalk.blue('🚀 Build successful!'));
