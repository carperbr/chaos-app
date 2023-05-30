import React, { useRef, useState } from 'react';
import { ToneCircle }  from './components'
import './App.scss';
import { ResizableModal } from './components/resizable-modal';

function App() {
  const [windows, setWindows] = useState(
    [ToneCircle, ToneCircle, ToneCircle].map((component, i) => {
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

  const handleWindowClose = (id: number) => {
    console.log('close!')
    setWindows(prevWindows => prevWindows.filter(win => win.id !== id));
  }

  return (
    <div className="app">
      {windows.sort((a,b) => a.zIndex - b.zIndex).map(win => {
        const Component = win.component;

        return (
        <div
          style={{ position: 'relative', zIndex: win.zIndex }}
          onMouseDown={() => handleWindowClick(win.id)}
          key={win.id}
        >
          <Component onClose={() => handleWindowClose(win.id)} />
        </div>
        )
      })}
    </div>
  )
}


export default App;