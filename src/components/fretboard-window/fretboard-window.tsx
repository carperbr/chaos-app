import React, {
  useState,
  CSSProperties,
} from "react";

import Draggable from "react-draggable";
import { FaTimes } from "react-icons/fa";
import { Fretboard } from '../fretboard'

import "./fretboard-window.scss";

export interface FretboardWindowProps {
  onClose: () => void;
  minHeight?: number;
  minWidth?: number;
}

export const FretboardWindow = (props: FretboardWindowProps) => {
  const [modalSize, setModalSize] = useState({ width: 400, height: 300 });

  const onClose = props.onClose;
  const minHeight = props.minHeight !== undefined ? props.minHeight : 64;
  const minWidth = props.minWidth !== undefined ? props.minWidth : 128;

  const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const ax = e.clientX;
    const ay = e.clientY;

    const onMouseMove = (e: MouseEvent) => {
      setModalSize({
        width: Math.max(minWidth, modalSize.width + (e.clientX - ax)),
        height: Math.max(minHeight, modalSize.height + (e.clientY - ay)),
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const modalStyle: CSSProperties = {
    width: modalSize.width,
    height: modalSize.height,
  };

  return (
    <div>
      <Draggable handle=".handle" bounds=".app">
        <div className="window-background" style={modalStyle}>
          <div className="handle">
            <b>Tone Circle</b>

            <div className="close-handle" onClick={() => onClose()}>
              <FaTimes />
            </div>
          </div>

          <div className="window-body">
            <Fretboard />
          </div>

          <div
            className="resize-handle"
            data-direction="se"
            onMouseDown={handleResize}
          />
        </div>
      </Draggable>
    </div>
  );
};
