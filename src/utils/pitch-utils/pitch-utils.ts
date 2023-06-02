import { Scale } from "../scale";

export class PitchUtils {
  private static pitches = [
    "c",
    "c#",
    "d",
    "d#",
    "e",
    "f",
    "f#",
    "g",
    "g#",
    "a",
    "a#",
    "b",
  ];

  static fromPitchClass(pitch: number): string {
    while (pitch < 0) {
      pitch = pitch + 12;
    }

    return PitchUtils.pitches[pitch % 12];
  }

  static toPitchClass(note: string): number {
    return PitchUtils.pitches.indexOf(note.toLowerCase());
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
