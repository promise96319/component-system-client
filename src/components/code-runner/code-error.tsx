'use client';

export default function CodeError(props: { error: Error }) {
  return (
    <div className="code-error" style={{ whiteSpace: 'pre' }}>
      {props.error.stack}
    </div>
  );
}
