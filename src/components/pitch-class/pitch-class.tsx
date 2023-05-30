import React from "react";
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
  onClick: (idx: number, event: React.MouseEvent) => void;
}

export const PitchClass = (props: PitchClassProps) => {
  const handleClick = (event: React.MouseEvent) => {
    props.onClick(props.idx, event);
  };

  const { note, x, y } = props;

  return (
    <text
      className={props.selected ? "pitch-class selected" : "pitch-class"}
      x={x}
      y={y}
      textAnchor="middle"
      alignmentBaseline="central"
      onClick={(event) => handleClick(event)}
    >
      {note}
    </text>
  );
};
