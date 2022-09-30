import { SparkProvider } from '@spark-web/core';
import React from 'react';

export const decorators = [
  Story => (
    <SparkProvider>
      <Story />
    </SparkProvider>
  ),
];
