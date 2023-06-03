import React, { useState, useRef } from "react";
import { PitchUtils, NOTES } from "../../utils";
import { Overlay, Popover, Dropdown, DropdownButton } from "react-bootstrap";
import "./fretboard-note.scss";

export interface FretboardNoteProps {
  string: number;
  root: number;
  fret: number;
  x: number;
  y: number;
  handleRootUpdated?: (idx: number, root: string) => void;
  onClick?: (root: number, fret: number) => void;
}

export const FretboardNote = (props: FretboardNoteProps) => {
    const [show, setShow] = useState(false);
    const target = useRef<SVGTextElement>(null);
    const popover = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popover.current && !popover.current.contains(event.target as Node)) {
            setShow(false)
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }

    const handleClick = () => {
        if (!show) {
            setShow(true);
            document.addEventListener('mousedown', handleClickOutside);
        }
    }

    const handleSelection = (note: string) => {
        if (props.handleRootUpdated) {
            props.handleRootUpdated(props.string, note)
        }

      setShow(false);
    };

  return (
    <g>
      <text
        className={props.fret == 0 ? "cls-7 root" : "cls-7"}
        transform={`translate(${props.x} ${props.y})`}
        onClick={() => props.fret == 0 ? handleClick() : void undefined}
        ref={target}
      >
        {PitchUtils.fromPitchClass(props.root + props.fret)}
      </text>

      <Overlay target={target.current} show={show} placement="right">
        <Popover>
            <Popover.Header as="h3">Change String</Popover.Header>
            <Popover.Body ref={popover}>
                <DropdownButton
                  title={PitchUtils.fromPitchClass(props.root)}
                  variant="Primary"
                >
                    {NOTES.map((n, idx) => (
                    <Dropdown.Item
                        eventKey={idx}
                        active={n === PitchUtils.fromPitchClass(props.root)}
                        onClick={() => handleSelection(n)}
                    >
                        {n}
                    </Dropdown.Item>
                    ))}
                </DropdownButton>
            </Popover.Body>
        </Popover>
      </Overlay> 
    </g>
  );
};
