import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

export function Loading() {
  return (
    <div className="fixed top-0 z-30 w-full">
      <LoadingBar style={{ height: '5px', background: '#4169E1' }} />
    </div>
  );
}
