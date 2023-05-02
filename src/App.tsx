import React, { useRef } from 'react';
import { ToneCircle }  from './components'
import './App.scss';

function App() {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app">
      <div className="tone-circle-container" ref={parentRef}>
        <ToneCircle parentRef={parentRef} />
      </div>
    </div>
  );
}

export default App;