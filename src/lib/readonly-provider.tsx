'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type ReadonlyContextValue = boolean;

const ReadonlyContext = createContext<ReadonlyContextValue>(false);

interface ReadonlyProviderProps {
  children: ReactNode;
  readonly: ReadonlyContextValue;
}

export const ReadonlyProvider: React.FC<ReadonlyProviderProps> = ({ children, readonly }) => (
  <ReadonlyContext.Provider value={readonly}>{children}</ReadonlyContext.Provider>
);

export const useReadonly = (): ReadonlyContextValue => useContext(ReadonlyContext);
