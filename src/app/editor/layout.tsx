import { cookies } from 'next/headers';
import { CodeDependency } from '@/components/code-runner';
import { getDesignCssDependency, getDesignJsDependency } from '@/utils/dependency';

export default function DLayout({ children }: { children: React.ReactNode }) {
  const majorVersion = Number(cookies().get('majorVersion')?.value);
  const designCssDependency = majorVersion ? [getDesignCssDependency(majorVersion)] : [];
  const designJsDependency = majorVersion ? [getDesignJsDependency(majorVersion)] : [];
  const dependency = <CodeDependency cssDependencies={designCssDependency} jsDependencies={designJsDependency} />;

  return (
    <>
      {dependency}
      {children}
    </>
  );
}
