import Link from 'next/link';
import './layout.scss';
import { getComponents } from '@/services/component';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const components = await getComponents();
  console.log('components', components);

  return (
    <div className="container">
      <div className="sidebar">
        {components.map((comp) => {
          return (
            <div key={comp.category}>
              {comp.category}
              {comp.components.map((item) => {
                return (
                  <Link key={item.componentId} href={`/docs/${item.componentId}/api`}>
                    {item.description}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      <div>
        当前页面：{params.slug}
        <div className="tab">
          <Link href={`/docs/${params.slug}/api`}>API 文档</Link>
          <Link href={`/docs/${params.slug}/design`}>设计文档</Link>
        </div>
        -----------------
        {children}
      </div>
    </div>
  );
}
