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

export const useReadonly = (): ReadonlyContextValue => {
  const readonlyValue = useContext(ReadonlyContext);
  if (readonlyValue === undefined) {
    // 如果没有提供 ReadonlyProvider，则返回默认值
    return false; // 或者根据您的需求返回其他默认值
  }
  return readonlyValue;
};
