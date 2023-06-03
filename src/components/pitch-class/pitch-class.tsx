import React, { useState, useRef } from "react";
import { Overlay, Dropdown, DropdownButton, Popover } from "react-bootstrap";
import "./pitch-class.scss";

import { NOTES } from "../../utils"

export interface PitchClassProps {
  note: string;
  idx: number;
  x: number;
  y: number;
  selected: boolean;
  handleNoteChange: (idx: number, note: string) => void;
}

export const PitchClass = (props: PitchClassProps) => {
  const [show, setShow] = useState(false);
  const target = useRef<SVGTextElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  const { note, x, y } = props;

  const handleClickOutisde = (event: MouseEvent) => {
    if (popover.current && !popover.current.contains(event.target as Node)) {
      setShow(false);
      document.removeEventListener("mousedown", handleClickOutisde);
    }
  };

  const handleClick = () => {
    if (!show) {
      setShow(true);
      document.addEventListener("mousedown", handleClickOutisde);
    }
  };

  const handleSelection = (note: string) => {
    props.handleNoteChange(props.idx, note);
    setShow(false);
  };

  return (
    <>
      <text
        className={props.selected ? "pitch-class selected" : "pitch-class"}
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="central"
        ref={target}
        onClick={() => handleClick()}
      >
        {note}
      </text>

      <Overlay target={target.current} show={show} placement="bottom">
        <Popover>
          <Popover.Header as="h3">Change Note</Popover.Header>
          <Popover.Body ref={popover}>
            <DropdownButton
              title={note}
              variant="Primary"
            >
              {NOTES.map((n, idx) => (
                <Dropdown.Item
                  eventKey={idx}
                  active={n === props.note}
                  onClick={() => handleSelection(n)}
                >
                  {n}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
