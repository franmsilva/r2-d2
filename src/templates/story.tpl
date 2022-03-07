import { Meta, Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {{componentName}} from '.';

type TArgs = React.ComponentProps<typeof {{componentName}}>;

export default {
  component: {{componentName}},
  title: '{{componentName}}',
  argTypes: {},
} as Meta<TArgs>;

const Wrapper = styled.div\`
  padding: 50px 0;
  margin: 0 auto;
  width: 80%;
\`;

const Template: Story<TArgs> = (args) => (
  <Wrapper>
    <{{componentName}} {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
