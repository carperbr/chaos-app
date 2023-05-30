import fs from "fs";
import { parseMidi, writeMidi, MidiData, MidiHeader } from "midi-file";

export const getWMidiNotes = (data: Uint8Array) => {
  const midi: MidiData = parseMidi(data);
  const notes: number[] = [];

  let minDelta = 0;
  midi.tracks[0].forEach((event) => {
    if (event.type === "noteOn") {
      notes.push(event.noteNumber);

      if (
        event.deltaTime > 0 &&
        (event.deltaTime < minDelta || minDelta == 0)
      ) {
        minDelta = event.deltaTime;
      }
    }
  });

  return { notes, delta: minDelta };
};

export const createMidiFile = (
  notes: number[],
  delta: number,
  numerator = 4,
  denominator = 4,
  metronome = 24,
  thirtyseconds = 8,
  microsecondsPerBeat = 500000
) => {
  const header: MidiHeader = {
    format: 1,
    ticksPerBeat: 480,
    numTracks: 1,
  };

  const data: MidiData = {
    header: header,
    tracks: [
      [
        { deltaTime: 0, type: "setTempo", microsecondsPerBeat },
        {
          deltaTime: 0,
          type: "timeSignature",
          numerator,
          denominator,
          metronome,
          thirtyseconds,
        },
      ],
    ],
  };

  notes.forEach((note) => {
    data.tracks[0].push({
      deltaTime: delta,
      type: "noteOn",
      channel: 0,
      noteNumber: note,
      velocity: 64,
    });
    data.tracks[0].push({
      deltaTime: 0,
      type: "noteOff",
      channel: 0,
      noteNumber: note,
      velocity: 64,
    });
  });

  return writeMidi(data);
};
