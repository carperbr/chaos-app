import React, { useState, useContext, useRef } from "react";
import "./tone-circle.scss";

import { PitchClass } from "../pitch-class";
import { NOTES } from "../../common";
import { WindowContext } from "../window";
import { Overlay, Popover, ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updatePitchSet, deletePitchSet } from "../../AppSlice";
import { PitchSet } from "../../common/pitch-set";

export const ToneCircle = () => {
  const pitchSets = useAppSelector((state) => state.app.pitchSets);
  const dispatch = useAppDispatch();

  const modalSize = useContext(WindowContext);
  const [name, setName] = useState<string>("New Pitch Set");
  const [notes, setNotes] = useState<string[]>([...NOTES]);
  const [showMenu, setShowMenu] = useState(false);
  const target = useRef<SVGCircleElement>(null);
  const popover = useRef<HTMLDivElement>(null);

  const handleNoteSelected = (idx: number, newNote: string) => {
    setNotes(notes.map((v, i) => (idx === i ? newNote : v)));
  };

  const handleClickOutisde = (event: MouseEvent) => {
    if (popover.current && !popover.current.contains(event.target as Node)) {
      setShowMenu(false);
      document.removeEventListener("mousedown", handleClickOutisde);
    }
  };

  const handleClick = () => {
    if (!showMenu) {
      setShowMenu(true);
      document.addEventListener("mousedown", handleClickOutisde);
    }
  };

  const handleNoteRemoved = (idx: number) => {
    setNotes(
      notes.filter((n, i) => {
        return i !== idx;
      })
    );
  };

  const handleNoteAdded = (idx: number, side: number, note: string) => {
    let newNotes = [...notes, notes[0]].map((v, i) => {
      if (i < idx) {
        return v;
      } else if (i == idx) {
        return note;
      } else {
        return notes[i - 1];
      }
    });

    setNotes(newNotes);
  };

  const handlePitchSetSaved = () => {
    dispatch(
      updatePitchSet({
        title: name,
        notes,
      })
    );
  };

  const handlePitchSetLoaded = (pitchSet: PitchSet) => {
    setNotes(pitchSet.notes);
    setName(pitchSet.title);
  };

  const outerRadius = Math.min(modalSize.width, modalSize.height) * 0.4;
  const innerRadius = Math.min(modalSize.width, modalSize.height) * 0.3;
  const textRadius = (outerRadius + innerRadius) * 0.5;
  const menuRadius = Math.min(modalSize.width, modalSize.height) * 0.05;
  const delta = (1 / notes.length) * 2 * Math.PI;

  const circleNotes = notes.map((note, i) => {
    const angle1 = (i / notes.length) * 2 * Math.PI;
    const angle = angle1;
    const x =
      modalSize.width / 2 +
      textRadius * Math.cos(angle - Math.PI * 0.5 + delta);
    const y =
      modalSize.height / 2 +
      textRadius * Math.sin(angle - Math.PI * 0.5 + delta);

    return (
      <PitchClass
        notes={notes}
        key={i}
        note={note}
        x={x}
        y={y}
        idx={i}
        handleNoteChange={handleNoteSelected}
        handleNoteRemoved={handleNoteRemoved}
        handleNoteAdded={handleNoteAdded}
      />
    );
  });

  const lines = notes.map((note, i) => {
    const angle1 = (i / notes.length) * 2 * Math.PI;
    const angle2 = ((i + 1) / notes.length) * 2 * Math.PI;
    const angle = (angle1 + angle2) * 0.5;
    const x1 =
      modalSize.width / 2 + outerRadius * Math.cos(angle - Math.PI * 0.5);
    const y1 =
      modalSize.height / 2 + outerRadius * Math.sin(angle - Math.PI * 0.5);
    const x2 = modalSize.width / 2 + 0.5 * Math.cos(angle - Math.PI * 0.5);
    const y2 = modalSize.height / 2 + 0.5 * Math.sin(angle - Math.PI * 0.5);
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
          <circle
            className="center-menu"
            cx={modalSize.width / 2}
            cy={modalSize.height / 2}
            r={menuRadius}
            onClick={() => handleClick()}
            ref={target}
          />
        </svg>
      </div>

      <Overlay target={target.current} show={showMenu} placement="auto">
        <Popover>
          <Popover.Header as="h3">Edit Set</Popover.Header>
          <Popover.Body ref={popover}>
            <ListGroup as="ul">
              <input
                className="title"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              />
              {pitchSets.map((pitchSet) => (
                <ListGroup.Item as="li" active={pitchSet.title === name}>
                  {pitchSet.title}{" "}
                  {pitchSet.title === name ? (
                    <FontAwesomeIcon
                      icon={faSave}
                      className="icon"
                      onClick={() => handlePitchSetSaved()}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faFolderOpen}
                      className="icon"
                      onClick={() => handlePitchSetLoaded(pitchSet)}
                    />
                  )}
                </ListGroup.Item>
              ))}

              {pitchSets.find((v) => v.title === name) === undefined && (
                <ListGroup.Item
                  className="pitch-set"
                  action
                  as="li"
                  onClick={() => handlePitchSetSaved()}
                >
                  Save Pitch Set
                </ListGroup.Item>
              )}
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
