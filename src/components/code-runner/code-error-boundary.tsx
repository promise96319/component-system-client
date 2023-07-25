'use client';

import React from 'react';
import CodeError from './code-error';

export default class CodeErrorBoundary extends React.PureComponent<{
  children: React.ReactNode;
}> {
  state = {
    error: null
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    return error ? <CodeError error={error}></CodeError> : this.props.children;
  }
}
