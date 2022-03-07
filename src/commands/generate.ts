import path from 'path';
import chalk from 'chalk';
import { Arguments, CommandBuilder } from 'yargs';
import { ensureDirSync, outputFileSync, readFileSync } from 'fs-extra';

import { EFileTypes } from '../types/enums';

type Options = {
  componentPath: string;
  optional?: boolean;
};

export const mapFileTypeToExtension: Record<EFileTypes, string> = {
  [EFileTypes.Component]: 'tsx',
  [EFileTypes.Index]: 'ts',
  [EFileTypes.Styles]: 'styled.tsx',
  [EFileTypes.Story]: 'story.tsx',
  [EFileTypes.Test]: 'test.tsx',
};

export const command = 'generate <path>';
export const description = 'Generate components with all of the required files';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .alias('g', 'generate')
    .options({
      o: {
        alias: 'optional',
        default: false,
        description: 'Include optional files',
        type: 'boolean',
      },
      n: {
        alias: 'name',
        description: 'Component name',
        type: 'string',
      },
    })
    .positional('componentPath', {
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
    ensureDirSync(componentPath);

    Object.values(EFileTypes).forEach((fileType) => {
      const buffer = readFileSync(
        path.join(__dirname, '..', 'template', `${fileType}.tpl`)
      );
      const template = buffer
        .toString()
        .replace(/{{componentName}}/g, componentName);
      const filePath =
        fileType === EFileTypes.Index
          ? `${componentPath}/${fileType}.ts`
          : `${componentPath}/${componentName}.${mapFileTypeToExtension[fileType]}`;

      // TODO: If it already exists, do not override!
      outputFileSync(filePath, template);
    });

    console.log(chalk.green('Component created!'));
  } catch (err) {
    console.log(
      chalk.redBright('Failed to created component due to the following error:')
    );
    console.log(err);
  }

  process.exit(0);
};
