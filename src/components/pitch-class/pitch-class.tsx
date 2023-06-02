import React, { useState, useRef, useEffect } from "react";
import { Overlay, Form, Dropdown, DropdownButton, Popover } from 'react-bootstrap'
import "./pitch-class.scss";

const notes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;
type Note = (typeof notes)[number];

export interface PitchClassProps {
  note: Note;
  idx: number;
  x: number;
  y: number;
  selected: boolean;
  handleNoteChange: (idx: number, note: Note) => void
}

export const PitchClass = (props: PitchClassProps) => {
  const [show, setShow] = useState(false)
  const target = useRef<SVGTextElement>(null)
  const popover = useRef<HTMLDivElement>(null)
  const { note, x, y } = props;

  const handleClickOutisde = (event: MouseEvent) => {
    if (popover.current && !popover.current.contains(event.target as Node)) {
      setShow(false)
      document.removeEventListener('mousedown', handleClickOutisde)
    }
  }

  const handleClick = () => {
    if (!show) {
      setShow(true)
      document.addEventListener('mousedown', handleClickOutisde);
    }
  }

  const handleSelection = (note: Note) => {
    props.handleNoteChange(props.idx, note)
    setShow(false)
  }

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

      <Overlay target={target.current} show={show} placement='bottom'>
        <Popover>
          <Popover.Header as="h3">Change Note</Popover.Header>
          <Popover.Body ref={popover}>
            <DropdownButton
              title={note}
              onChange={(e) => console.log(e)}
              variant="Primary">
                {notes.map((n, idx) => (
                  <Dropdown.Item eventKey={idx} active={n == props.note} onClick={() => handleSelection(n)}>{n}</Dropdown.Item>
                ))}
              </DropdownButton>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
