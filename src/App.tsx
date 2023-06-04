import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToneCircle, Fretboard, Window } from "./components";
import { Appbar } from "./components/appbar";

function App() {
  const [windows, setWindows] = useState(
    [ToneCircle, ToneCircle, ToneCircle, Fretboard].map((component, i) => {
      return {
        component,
        zIndex: i,
        id: i,
        visible: true,
        type: component === Fretboard ? "fretboard" : "tone-circle",
        title: "New Window",
      };
    })
  );

  const handleWindowClick = (id: number) => {
    if (id !== windows[windows.length - 1].id) {
      setWindows((prevWindows) => {
        const maxZIndex = Math.max(...prevWindows.map((win) => win.zIndex));

        const updatedWindows = prevWindows.map((win) => {
          if (win.id === id) {
            return { ...win, zIndex: maxZIndex + 1 };
          }

          return win;
        });

        return updatedWindows
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((win, idx) => {
            return { ...win, zIndex: idx };
          });
      });
    }
  };

  const handleWindowClose = (id: number) => {
    setWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
  };

  const handleWindowMinimized = (id: number) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) => {
        if (win.id === id) {
          return { ...win, visible: false };
        }

        return win;
      })
    );
  };

  const handleWindowRestored = (id: number) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) => {
        if (win.id === id) {
          return { ...win, visible: true };
        }

        return win;
      })
    );

    handleWindowClick(id);
  };

  const handleTitleUpdated = (id: number, title: string) => {
    setWindows((prevWindows) =>
      prevWindows.map((win) => {
        if (win.id === id) {
          return { ...win, title: title };
        }

        return win;
      })
    );
  };

  return (
    <div className="app">
      <Appbar windows={windows} handleWindowRestored={handleWindowRestored} />

      {windows.map((win) => {
        const Component = win.component;

        return (
          <div
            style={{ position: "relative", zIndex: win.zIndex }}
            onMouseDown={() => handleWindowClick(win.id)}
            key={win.id}
            className={!win.visible ? "hidden-window" : undefined}
          >
            <Window
              id={win.id}
              title={win.title}
              handleTitleUpdated={handleTitleUpdated}
              onClose={() => handleWindowClose(win.id)}
              onMinimize={() => handleWindowMinimized(win.id)}
              active={windows[windows.length - 1].id === win.id}
            >
              <Component />
            </Window>
          </div>
        );
      })}
    </div>
  );
}

export default App;
