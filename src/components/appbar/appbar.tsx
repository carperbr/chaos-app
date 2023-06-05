import React, { useState, useRef } from "react";
import {
  Container,
  ListGroup,
  Nav,
  Navbar,
  Dropdown,
  Overlay,
  Popover,
} from "react-bootstrap";
import "./appbar.scss";

import { Fretboard, ToneCircle } from "../../components";

export interface Window {
  component: () => JSX.Element;
  zIndex: number;
  id: number;
  visible: boolean;
  title: string;
}

export interface AppbarProps {
  handleWindowRestored: (id: number) => void;
  handleWindowCreated: (component: () => JSX.Element) => void;
  windows: Window[];
}

export const Appbar = (props: AppbarProps) => {
  const [showFretboards, setShowFretboards] = useState(false);
  const [showPitchSets, setShowPitchSets] = useState(false);
  const fretboardTarget = useRef<HTMLDivElement>(null);
  const pitchSetTarget = useRef<HTMLDivElement>(null);
  const fretboardPopover = useRef<HTMLDivElement>(null);
  const pitchSetPopover = useRef<HTMLDivElement>(null);

  const handleClickOutisdeFretboards = (event: MouseEvent) => {
    if (
      fretboardPopover.current &&
      !fretboardPopover.current.contains(event.target as Node)
    ) {
      setShowFretboards(false);
      document.removeEventListener("mousedown", handleClickOutisdeFretboards);
    }
  };

  const handleClickFretboards = () => {
    if (!showFretboards) {
      setShowFretboards(true);
      document.addEventListener("mousedown", handleClickOutisdeFretboards);
    }
  };

  const handleClickOutisdePitchSets = (event: MouseEvent) => {
    if (
      pitchSetPopover.current &&
      !pitchSetPopover.current.contains(event.target as Node)
    ) {
      setShowPitchSets(false);
      document.removeEventListener("mousedown", handleClickOutisdePitchSets);
    }
  };

  const handleClickPitchSets = () => {
    if (!showPitchSets) {
      setShowPitchSets(true);
      document.addEventListener("mousedown", handleClickOutisdePitchSets);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="appbar">
        <Container>
          <Navbar.Brand>Musical Chaos Theory</Navbar.Brand>
          <Nav className="me-auto">
            <div
              className={"appbar-item" + (showFretboards ? " active" : "")}
              ref={fretboardTarget}
              onClick={() => handleClickFretboards()}
            >
              Fretboards
            </div>
            <div
              className={"appbar-item" + (showPitchSets ? " active" : "")}
              ref={pitchSetTarget}
              onClick={() => handleClickPitchSets()}
            >
              Pitch Sets
            </div>
          </Nav>
        </Container>
      </Navbar>

      <Overlay
        target={fretboardTarget.current}
        show={showFretboards}
        placement="top"
      >
        <Popover>
          <Popover.Header as="h3">Fretboards</Popover.Header>
          <Popover.Body ref={fretboardPopover}>
            <ListGroup>
              {props.windows
                .sort((a, b) => (a.id > b.id ? -1 : 1))
                .filter((win) => win.component.name === Fretboard.name)
                .map((win) => {
                  return (
                    <ListGroup.Item
                      className="window-item"
                      onClick={() => props.handleWindowRestored(win.id)}
                      active={!win.visible}
                    >
                      {win.title} [{win.id}]
                    </ListGroup.Item>
                  );
                })}
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item
                className="window-item"
                onClick={() => props.handleWindowCreated(Fretboard)}
              >
                Open New Window
              </ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>

      <Overlay
        target={pitchSetTarget.current}
        show={showPitchSets}
        placement="top"
      >
        <Popover>
          <Popover.Header as="h3">Pitch Sets</Popover.Header>
          <Popover.Body ref={pitchSetPopover}>
            <ListGroup>
              {props.windows
                .sort((a, b) => (a.id > b.id ? -1 : 1))
                .filter((win) => win.component.name === ToneCircle.name)
                .map((win) => {
                  return (
                    <ListGroup.Item
                      className="window-item"
                      onClick={() => props.handleWindowRestored(win.id)}
                      active={!win.visible}
                    >
                      {win.title} [{win.id}]
                    </ListGroup.Item>
                  );
                })}
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item
                className="window-item"
                onClick={() => props.handleWindowCreated(ToneCircle)}
              >
                Open New Window
              </ListGroup.Item>
            </ListGroup>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
