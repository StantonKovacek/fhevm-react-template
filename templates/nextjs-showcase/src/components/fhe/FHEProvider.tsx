"use client";

/**
 * FHE Provider wrapper component
 * Re-exports the SDK provider with additional context
 */

import React from 'react';
import { FhevmProvider } from '@fhevm-toolkit/sdk/react';
import { defaultFHEConfig } from '../../lib/fhe/client';

export interface FHEProviderProps {
  children: React.ReactNode;
  config?: any;
}

export const FHEProvider: React.FC<FHEProviderProps> = ({ children, config }) => {
  const fheConfig = config || defaultFHEConfig;

  return (
    <FhevmProvider config={fheConfig}>
      {children}
    </FhevmProvider>
  );
};
