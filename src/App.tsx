import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToneCircle, Fretboard, Window } from "./components";

function App() {
  const [windows, setWindows] = useState(
    [ToneCircle, ToneCircle, ToneCircle, Fretboard].map((component, i) => {
      return {
        component,
        zIndex: i,
        id: i,
      };
    })
  );

  const handleWindowClick = (id: number) => {
    if (id !== windows[windows.length - 1].id) {
      setWindows((prevWindows) => {
        const maxZIndex = Math.max(...prevWindows.map((win) => win.zIndex));
        return prevWindows.map((win) => {
          if (win.id === id) {
            return { ...win, zIndex: maxZIndex + 1 };
          }

          return win;
        });
      });
    }
  };

  const handleWindowClose = (id: number) => {
    setWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
  };

  return (
    <div className="app">
      {windows
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((win) => {
          const Component = win.component;

          return (
            <div
              style={{ position: "relative", zIndex: win.zIndex }}
              onMouseDown={() => handleWindowClick(win.id)}
              key={win.id}
            >
              <Window onClose={() => handleWindowClose(win.id)}>
                <Component />
              </Window>
            </div>
          );
        })}
    </div>
  );
}

export default App;
