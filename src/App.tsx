import React, { useRef } from 'react';
import { ToneCircle }  from './components'
import './App.scss';
import { ResizableModal } from './components/resizable-modal';

function App() {
  const parentRef = useRef<HTMLDivElement>(null);
  const parentRef2 = useRef<HTMLDivElement>(null)

  return (
    <div className="app">
        <ToneCircle />
    </div>
  );
}

export default App;