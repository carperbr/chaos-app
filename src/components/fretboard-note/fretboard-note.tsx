import { PitchUtils } from '../../utils'
import './fretboard-note.scss'

export interface FretboardNoteProps {
    root: number;
    fret: number;
    x: number;
    y: number;
    onClick?: (root: number, fret: number) => void;
}

export const FretboardNote = (props: FretboardNoteProps) => {
    return (
        <g>
            <text className='cls-7' transform={`translate(${props.x} ${props.y})`} onClick={() => props.onClick ? props.onClick(props.root, props.fret) : void undefined}>{PitchUtils.fromPitchClass(props.root + props.fret)}</text>
        </g>
    )
}