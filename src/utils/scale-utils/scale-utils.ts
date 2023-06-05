import { PitchUtils } from "../pitch-utils";
import { Scale } from "./scale";

export const calculateScaleNotes = (scale: Scale, tonic: string) => {
  let current = PitchUtils.toPitchClass(tonic);
  let notes = [current];

  for (let s of scale.steps) {
    if (s.toLowerCase() == "s") {
      current += 1;
    } else if (s.toLowerCase() == "t") {
      current += 2;
    } else if (s.toLowerCase() == "a") {
      current += 3;
    } else if (s.toLowerCase() == "4") {
      current += 4;
    }

    notes.push(current % 12);
  }

  return notes.slice(0, -1).map((v) => PitchUtils.fromPitchClass(v));
};
