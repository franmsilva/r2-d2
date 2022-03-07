import React, { FC } from 'react';

import { Client } from '@lickhome/common/src/types';

import { Container } from './{{componentName}}.styled';

export interface I{{componentName}}Props extends Client.IStyledComponent {
  value: string;
}

const {{componentName}}: FC<I{{componentName}}Props> = ({ className, children }) => {
  return <Container className={className}>{children}</Container>;
};

export default {{componentName}};
