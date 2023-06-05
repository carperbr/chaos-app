import React from "react";
import { PitchSet } from "../../common/pitch-set";
import { FretboardNote } from "../fretboard-note";
import "./fretboard-string.scss";

export interface FretboardStringProps {
  pitchSet: PitchSet;
  root: number;
  string: number;
  points: { x: number; y: number }[];
  handleRootUpdated: (idx: number, root: string) => void;
}

export const FretboardString = (props: FretboardStringProps) => {
  return (
    <g>
      <line
        className="cls-6"
        x1={props.points[0].x}
        y1={props.points[0].y}
        x2={props.points[1].x}
        y2={props.points[1].y}
      />

      {props.points.slice(2).map((v, idx) => (
        <FretboardNote
          key={idx}
          root={props.root}
          x={v.x}
          y={v.y}
          fret={idx}
          handleRootUpdated={idx == 0 ? props.handleRootUpdated : undefined}
          string={props.string}
          pitchSet={props.pitchSet}
        ></FretboardNote>
      ))}
    </g>
  );
};
