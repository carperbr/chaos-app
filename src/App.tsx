import React, { useRef, useState } from 'react';
import { ToneCircle }  from './components'
import './App.scss';
import { ResizableModal } from './components/resizable-modal';

function App() {
  const [windows, setWindows] = useState(
    [ToneCircle, ToneCircle].map((component, i) => {
      return {
        component,
        zIndex: i,
        id: i
      }
    })
  );

  const handleWindowClick = (id: number) =>
    setWindows(prevWindows => {
      const maxZIndex = Math.max(...prevWindows.map(win => win.zIndex));
      return prevWindows.map(win => {
        if (win.id == id) {
          return { ...win, zIndex: maxZIndex + 1 }
        }

        return win
      })
  })

  return (
    <div className="app">
      {windows.sort((a,b) => a.zIndex - b.zIndex).map(win => (
        <div
          style={{ position: 'relative', zIndex: win.zIndex }}
          onMouseDown={() => handleWindowClick(win.id)}
          key={win.id}
        >
          <win.component />
        </div>
      ))}
    </div>
  )
}


export default App;