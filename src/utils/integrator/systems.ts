import { IntegratorData } from "./integrator";

export const LorenzSystem01: IntegratorData = new IntegratorData(
  [4, 16, 1],
  [1, 2, 6],
  [
    (params: number[], state: number[]) => {
      return params[0] * (state[1] - state[0]);
    },

    (params: number[], state: number[]) => {
      return -(state[0] * state[2]) + params[1] * state[0] - state[1];
    },

    (params: number[], state: number[]) => {
      return state[0] * state[1] - params[2] * state[2];
    },
  ]
);

export const VanDerPolOscillator01: IntegratorData = new IntegratorData(
  [1, 1, 0.45],
  [1, 1, 0],
  [
    (params: number[], state: number[]) => {
      return state[1];
    },

    (params: number[], state: number[]) => {
      return (
        params[0] * Math.sin(state[2]) -
        params[1] * (Math.pow(state[0], 2) - 1) * state[1] -
        state[0]
      );
    },

    (params: number[], state: number[]) => {
      return params[2];
    },
  ]
);

export const ForcedConservative01a: IntegratorData = new IntegratorData(
  [2],
  [0, 0, 0],
  [
    (p: number[], state: number[]) => {
      return state[1];
    },

    (p: number[], state: number[]) => {
      return Math.sin(state[2]) - Math.pow(state[0], 3);
    },

    (p: number[], state: number[]) => {
      return p[0];
    },
  ]
);

export const ForcedConservative01b = new IntegratorData(
  [2],
  [0.0001, 0, 0],
  [
    (p: number[], state: number[]) => {
      return state[1];
    },

    (p: number[], state: number[]) => {
      return Math.sin(state[2]) - Math.pow(state[0], 3);
    },

    (p: number[], state: number[]) => {
      return p[0];
    },
  ]
);

export const DixonSystem = new IntegratorData(
  [0, 0.7],
  [1, 0],
  [
    (params: number[], state: number[]) => {
      return (
        (state[0] * state[1]) /
          (Math.pow(state[0], 2) + Math.pow(state[1], 2)) -
        params[0] * state[0]
      );
    },

    (params: number[], state: number[]) => {
      return (
        Math.pow(state[1], 2) /
          (Math.pow(state[0], 2) + Math.pow(state[1], 2)) -
        params[1] * state[1] +
        params[1] -
        1
      );
    },
  ]
);
