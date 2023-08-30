'use client';

import { useSearchParams } from 'next/navigation';
import { CodeDependency } from '@/components/code-runner';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';

export const DesignDependency = () => {
  const majorVersion = Number(useSearchParams().get('v') ?? 3);
  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion)] : [];
  return <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;
};
