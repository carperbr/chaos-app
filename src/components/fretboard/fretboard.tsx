import React, { useRef, useState } from "react";

import "./fretboard.scss";

import { FretboardString } from "../fretboard-string";
import { fretboards } from "../fretboard/labels";
import { PitchUtils } from '../../utils'

export const Fretboard = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleRootUpdated = (idx: number, root: string) => {
    setRoots(roots.map((r, i) => {
      if (i === idx) {
        return root;
      }

      return r;
    })
  )}

  const [roots, setRoots] = useState(fretboards.multi8string.tuning)

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 764.07 197.04"
      >
        <g id="Layer_2" data-name="Layer 2">
          <polygon
            className="cls-1"
            points="0.51 47.78 740.51 0.53 763.51 196.53 0.51 175.53 0.51 47.78"
          />
          <line
            className="cls-2"
            x1="752.51"
            y1="196.53"
            x2="729.51"
            y2="0.53"
          />
          <line
            className="cls-2"
            x1="738.51"
            y1="196.53"
            x2="716.51"
            y2="2.28"
          />
          <line
            className="cls-2"
            x1="722.51"
            y1="194.78"
            x2="701.51"
            y2="2.28"
          />
          <line
            className="cls-2"
            x1="706.51"
            y1="194.78"
            x2="685.51"
            y2="4.03"
          />
          <line
            className="cls-2"
            x1="687.51"
            y1="194.78"
            x2="669.51"
            y2="5.78"
          />
          <line
            className="cls-2"
            x1="669.51"
            y1="194.78"
            x2="651.51"
            y2="5.78"
          />
          <line
            className="cls-2"
            x1="651.51"
            y1="193.03"
            x2="634.51"
            y2="7.53"
          />
          <line
            className="cls-2"
            x1="690.51"
            y1="196.53"
            x2="690.51"
            y2="196.53"
          />
          <line
            className="cls-3"
            x1="629.51"
            y1="193.03"
            x2="614.51"
            y2="9.28"
          />
          <line
            className="cls-3"
            x1="607.51"
            y1="193.03"
            x2="594.51"
            y2="9.28"
          />
          <line
            className="cls-3"
            x1="585.51"
            y1="191.28"
            x2="572.51"
            y2="11.03"
          />
          <line
            className="cls-3"
            x1="559.51"
            y1="191.28"
            x2="550.51"
            y2="12.78"
          />
          <line
            className="cls-3"
            x1="533.51"
            y1="189.53"
            x2="527.51"
            y2="14.53"
          />
          <line
            className="cls-3"
            x1="507.51"
            y1="189.53"
            x2="500.51"
            y2="16.28"
          />
          <line
            className="cls-3"
            x1="478.51"
            y1="189.53"
            x2="472.51"
            y2="18.03"
          />
          <line
            className="cls-3"
            x1="447.51"
            y1="187.78"
            x2="444.51"
            y2="19.78"
          />
          <line
            className="cls-3"
            x1="414.51"
            y1="187.78"
            x2="413.51"
            y2="21.53"
          />
          <line
            className="cls-3"
            x1="381.51"
            y1="186.03"
            x2="382.51"
            y2="23.28"
          />
          <line
            className="cls-3"
            x1="346.51"
            y1="185.15"
            x2="348.51"
            y2="25.9"
          />
          <line
            className="cls-3"
            x1="308.51"
            y1="185.15"
            x2="313.51"
            y2="29.4"
          />
          <line
            className="cls-3"
            x1="267.51"
            y1="183.4"
            x2="276.51"
            y2="31.15"
          />
          <line
            className="cls-3"
            x1="226.51"
            y1="182.53"
            x2="236.51"
            y2="32.9"
          />
          <line
            className="cls-3"
            x1="179.51"
            y1="180.78"
            x2="193.51"
            y2="36.4"
          />
          <line
            className="cls-3"
            x1="132.51"
            y1="179.9"
            x2="149.51"
            y2="39.03"
          />
          <line
            className="cls-3"
            x1="82.51"
            y1="178.15"
            x2="103.51"
            y2="41.65"
          />
          <line className="cls-3" x1="27.51" y1="176.4" x2="50.51" y2="45.15" />
          <line className="cls-4" x1="24.51" y1="176.4" x2="23.51" y2="46.9" />
          <path
            className="cls-4"
            d="M397,162.87"
            transform="translate(-396.49 -10.1)"
          />
          <path
            className="cls-4"
            d="M1155,166.38"
            transform="translate(-396.49 -10.1)"
          />
          <polygon
            className="cls-5"
            points="403.1 163.01 399.51 165.35 395.68 163.41 395.45 159.12 399.05 156.78 402.87 158.73 403.1 163.01"
          />
          <polygon
            className="cls-5"
            points="496.1 165.01 492.51 167.35 488.68 165.41 488.45 161.12 492.05 158.78 495.87 160.73 496.1 165.01"
          />
          <polygon
            className="cls-5"
            points="496.1 146.01 492.51 148.35 488.68 146.41 488.45 142.12 492.05 139.78 495.87 141.73 496.1 146.01"
          />
          <polygon
            className="cls-5"
            points="567.1 39.01 563.51 41.35 559.68 39.41 559.45 35.12 563.05 32.78 566.87 34.73 567.1 39.01"
          />
          <polygon
            className="cls-5"
            points="611.1 37.01 607.51 39.35 603.68 37.41 603.45 33.12 607.05 30.78 610.87 32.73 611.1 37.01"
          />
          <polygon
            className="cls-5"
            points="650.1 35.01 646.51 37.35 642.68 35.41 642.45 31.12 646.05 28.78 649.87 30.73 650.1 35.01"
          />
          <polygon
            className="cls-5"
            points="684.1 34.01 680.51 36.35 676.68 34.41 676.45 30.12 680.05 27.78 683.87 29.73 684.1 34.01"
          />
          <polygon
            className="cls-5"
            points="730.1 32.01 726.51 34.35 722.68 32.41 722.45 28.12 726.05 25.78 729.87 27.73 730.1 32.01"
          />
          <polygon
            className="cls-5"
            points="733.1 57.01 729.51 59.35 725.68 57.41 725.45 53.12 729.05 50.78 732.87 52.73 733.1 57.01"
          />
        </g>
        <g id="Layer_138_copy" data-name="Layer 138 copy">
          <polygon
            className="cls-5"
            points="253.1 160.01 249.51 162.35 245.68 160.41 245.45 156.12 249.05 153.78 252.87 155.73 253.1 160.01"
          />
          <polygon
            className="cls-5"
            points="165.1 158.01 161.51 160.35 157.68 158.41 157.45 154.12 161.05 151.78 164.87 153.73 165.1 158.01"
          />
          <polygon
            className="cls-5"
            points="332.1 162.01 328.51 164.35 324.68 162.41 324.45 158.12 328.05 155.78 331.87 157.73 332.1 162.01"
          />
        </g>
        {fretboards.multi8string.labels.map((str, idx) => (
          <FretboardString root={PitchUtils.toPitchClass(roots[idx])} string={idx} points={str} key={idx} handleRootUpdated={handleRootUpdated} />
        ))}
      </svg>
      <canvas ref={canvasRef} width="2048" height="2048"></canvas>
      {/* <img ref={imgRef} style={{display: "none" }} /> */}
    </>
  );
};
