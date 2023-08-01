'use client';

import { useState } from 'react';

export const useLocalStorage = (key: string, defaultValue?: string) => {
  const [_item, setItem] = useState<string>(defaultValue ?? '');

  const value = globalThis?.localStorage?.getItem(key) ?? '';
  const setValue = (value?: string | null) => {
    globalThis.localStorage?.setItem(key, value ?? '');
    setItem(value ?? '');
  };

  return [value, setValue] as const;
};
