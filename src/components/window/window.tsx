import React, { useState, ReactNode, CSSProperties } from "react";
import Draggable from "react-draggable";
import { WindowContext } from "./window-context";
import { CloseButton } from "react-bootstrap";
import "./window.scss";

export interface WindowProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  minHeight?: number;
  minWidth?: number;
}

export const Window = (props: WindowProps) => {
  const [modalSize, setModalSize] = useState({ width: 400, height: 300 });

  const onClose = props.onClose;
  const minHeight = props.minHeight !== undefined ? props.minHeight : 64;
  const minWidth = props.minWidth !== undefined ? props.minWidth : 128;

  const title = props.title ? props.title : "New Window";

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

  const handleResizeBottom = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const ay = e.clientY;

    const onMouseMove = (e: MouseEvent) => {
      setModalSize({
        width: modalSize.width,
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

  const handleResizeRight = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const ax = e.clientX;

    const onMouseMove = (e: MouseEvent) => {
      setModalSize({
        width: Math.max(minWidth, modalSize.width + (e.clientX - ax)),
        height: modalSize.height,
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
          <div className={"handle"}>
            <b className="title">{title}</b>

            <CloseButton className="close-handle" onClick={() => onClose()} />
          </div>

          <WindowContext.Provider value={modalSize}>
            <div className="window-body">{props.children}</div>
          </WindowContext.Provider>

          <div
            className="resize-handle-corner"
            data-direction="se"
            onMouseDown={handleResize}
          />

          <div
            className="resize-handle-bottom"
            data-direction="se"
            onMouseDown={handleResizeBottom}
          />

          <div
            className="resize-handle-right"
            data-direction="se"
            onMouseDown={handleResizeRight}
          />
        </div>
      </Draggable>
    </div>
  );
};
