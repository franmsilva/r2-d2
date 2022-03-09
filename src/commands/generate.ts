import path from 'path';
import chalk from 'chalk';
import { Arguments, CommandBuilder } from 'yargs';
import {
  ensureDirSync,
  outputFileSync,
  pathExistsSync,
  readFileSync,
} from 'fs-extra';

import { EFileTypes } from '../types/enums';

type Options = {
  componentPath: string;
};

export const mapFileTypeToExtension: Record<EFileTypes, string> = {
  [EFileTypes.Component]: 'tsx',
  [EFileTypes.Index]: 'ts',
  [EFileTypes.Styles]: 'styled.tsx',
  [EFileTypes.Story]: 'story.tsx',
  [EFileTypes.Test]: 'test.tsx',
};

export const command = 'generate <componentPath>';
export const description = 'Generate components with all of the required files';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.alias('g', 'generate').positional('componentPath', {
    demandOption: true,
    description: 'Path to component from present directory',
    normalize: true,
    type: 'string',
  });

export const handler = (argv: Arguments<Options>): void => {
  const { componentPath } = argv;

  const pathArr = componentPath.split('/');
  const componentName = pathArr[pathArr.length - 1];

  try {
    console.log(chalk.blue('🔨 Initiating component generator...\n'));

    ensureDirSync(componentPath);

    Object.values(EFileTypes).forEach((fileType) => {
      const buffer = readFileSync(
        path.join(__dirname, '..', 'templates', `${fileType}.tpl`)
      );
      const template = buffer
        .toString()
        .replace(/{{componentName}}/g, componentName);
      const filePath =
        fileType === EFileTypes.Index
          ? `${componentPath}/${fileType}.ts`
          : `${componentPath}/${componentName}.${mapFileTypeToExtension[fileType]}`;

      if (pathExistsSync(filePath)) {
        console.log(
          chalk.yellow(`⏭ File of type ${fileType} already exists. Skipped`)
        );
      } else {
        outputFileSync(filePath, template);
        console.log(
          chalk.green(
            `✔ File of type ${chalk.greenBright.italic.bold(
              fileType
            )} created: ${chalk.underline.hex('#7a2bab')(filePath)}`
          )
        );
      }
    });

    console.log(chalk.blue('\n 🚀 Component directory created!'));
  } catch (err) {
    console.log(
      chalk.redBright('Failed to created component due to the following error:')
    );
    console.log(err);
  }

  process.exit(0);
};
