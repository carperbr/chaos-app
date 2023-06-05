import { Scale } from "../scale-utils";

export const NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as string[];

export class PitchUtils {
  static fromPitchClass(pitch: number): string {
    while (pitch < 0) {
      pitch = pitch + 12;
    }

    return NOTES[pitch % 12];
  }

  static toPitchClass(note: string): number {
    return NOTES.indexOf(note.toUpperCase());
  }

  static calculateScalePitches(scale: Scale, tonic: number): number[] {
    let current = tonic;
    let notes = [current];

    let ss = scale.steps.split("");

    for (let s of ss) {
      if (s.toLowerCase() === "s") {
        current += 1;
      } else if (s.toLowerCase() === "t") {
        current += 2;
      } else if (s.toLowerCase() === "a") {
        current += 3;
      } else if (s.toLowerCase() === "4") {
        current += 4;
      }

      notes.push(current % 12);
    }

    return notes;
  }

  static calculateScaleNotes(scale: Scale, tonic: number): string {
    let current = tonic;
    let notes = [current];
    let noteStr = PitchUtils.fromPitchClass(tonic);

    for (let s of scale.steps) {
      if (s.toLowerCase() === "s") {
        current += 1;
      } else if (s.toLowerCase() === "t") {
        current += 2;
      } else if (s.toLowerCase() === "a") {
        current += 3;
      } else if (s.toLowerCase() === "4") {
        current += 4;
      }

      noteStr += " " + PitchUtils.fromPitchClass(current % 12);
      notes.push(current % 12);
    }

    return noteStr.toUpperCase();
  }
}
