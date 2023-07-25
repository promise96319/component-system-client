'use client';

export default function CodeError(props: { error: Error }) {
  return (
    <div className="code-error" style={{ whiteSpace: 'pre', overflow: 'auto', maxHeight: 300 }}>
      {props.error.stack}
    </div>
  );
}
