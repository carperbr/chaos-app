import React, { useState, useContext } from "react";
import "./tone-circle.scss";

import { PitchClass } from "../pitch-class";
import { NOTES, Note } from "../../common";
import { NoteSelector } from "../event-selector";
import { WindowContext } from "../window";

export const ToneCircle = () => {
  const modalSize = useContext(WindowContext);
  const [activeNote, setActiveNote] = useState<Note | null>();
  const [activeIndex, setActiveIndex] = useState<number | null>();
  const [activePosition, setActivePosition] = useState<{
    x: number;
    y: number;
  } | null>();
  const [notes, setNotes] = useState<Note[]>([...NOTES]);

  const handleNoteSelected = (idx: number, newNote: Note) => {
    setNotes(notes.map((v, i) => (idx === i ? newNote : v)));
    setActiveNote(null);
    setActiveIndex(null);
    setActivePosition(null);
  };

  const outerRadius = Math.min(modalSize.width, modalSize.height) * 0.4;
  const innerRadius = Math.min(modalSize.width, modalSize.height) * 0.3;

  const circleNotes = notes.map((note, i) => {
    const angle = (i / notes.length) * 2 * Math.PI;
    const x =
      modalSize.width / 2 +
      (innerRadius + outerRadius) * -0.5 * Math.sin(-angle);
    const y =
      modalSize.height / 2 +
      (innerRadius + outerRadius) * -0.5 * Math.cos(-angle);

    return (
      <PitchClass
        key={i}
        note={note}
        x={x}
        y={y}
        idx={i}
        handleNoteChange={handleNoteSelected}
        selected={i === activeIndex}
      />
    );
  });

  const lines = notes.map((note, i) => {
    const angle1 = (i / notes.length) * 2 * Math.PI;
    const angle2 = ((i + 1) / notes.length) * 2 * Math.PI;
    const angle = (angle1 + angle2) * 0.5;
    const x1 = modalSize.width / 2 + outerRadius * Math.cos(angle);
    const y1 = modalSize.height / 2 + outerRadius * Math.sin(angle);
    const x2 = modalSize.width / 2 + 0.5 * Math.cos(angle);
    const y2 = modalSize.height / 2 + 0.5 * Math.sin(angle);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />;
  });

  return (
    <>
      <div className="window-body">
        <svg className="svg-body">
          <circle
            cx={modalSize.width / 2}
            cy={modalSize.height / 2}
            r={outerRadius}
            stroke="black"
            fill="none"
          />
          <circle
            cx={modalSize.width / 2}
            cy={modalSize.height / 2}
            r={innerRadius}
            stroke="black"
            fill="none"
          />
          {lines}
          {circleNotes}
        </svg>
      </div>

      {activePosition && activeNote && activeIndex != null && (
        <NoteSelector
          position={activePosition}
          activeNote={activeNote}
          activeIndex={activeIndex}
          onNoteSelected={handleNoteSelected}
        />
      )}
    </>
  );
};
