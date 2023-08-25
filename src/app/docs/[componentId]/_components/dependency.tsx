import { cookies } from 'next/headers';
import { CodeDependency } from '@/components/code-runner';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';

export const DesignDependency = () => {
  const majorVersion = Number(cookies().get('majorVersion')?.value) ?? 3;
  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion)] : [];
  return <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;
};
