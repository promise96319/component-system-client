'use client';

import React from 'react';
import CodeError from './code-error';

export default class CodeErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state = {
    error: null
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    return error ? <CodeError error={error}></CodeError> : children;
  }
}
