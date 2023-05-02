import React, { useState, useRef, useEffect } from 'react'

import { PitchClass } from '../pitch-class'
import { NOTES, Note } from '../../common'
import { NoteSelector } from '../event-selector';

export interface ToneCircleProps {
    parentRef?: React.RefObject<HTMLDivElement>
}

export const ToneCircle = (props: ToneCircleProps) => {
    const [width, setWidth] = useState(600)
    const [height, setHeight] = useState(600)
    const [activeNote, setActiveNote] = useState<Note | null>()
    const [activeIndex, setActiveIndex] = useState<number | null>()
    const [activePosition, setActivePosition] = useState<{ x: number, y: number} | null>()
    const [notes, setNotes] = useState<Note[]>([...NOTES])
    const resizeObserver = useRef<ResizeObserver | null>()
    
    const handleSlotClicked = (note: Note, idx: number, x: number, y: number) => {
        setActiveNote(note)
        setActiveIndex(idx)
        setActivePosition({ x, y })
    }

    const handleNoteSelected = (idx: number, newNote: Note) => {
        setNotes(notes.map((v, i) => idx === i ? newNote : v));
        setActiveNote(null);
        setActiveIndex(null);
        setActivePosition(null);
    }

    useEffect(() => {
        if (props.parentRef?.current) {
            resizeObserver.current = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setWidth(entry.contentRect.width);
                    setHeight(entry.contentRect.height);
                }
            });
            
            resizeObserver.current.observe(props.parentRef.current)
        }

        return () => {
            if (resizeObserver.current) {
                resizeObserver.current.disconnect()
            }
        }
    })
    
    const outerRadius = 250;
    const innerRadius = 125;

    const circleNotes = notes.map((note, i) => {
        const angle = (i / notes.length) * 2 * Math.PI;
        const x = width / 2 + (innerRadius + outerRadius) * -0.5 * Math.sin(-angle);
        const y = height / 2 + (innerRadius + outerRadius) * -0.5 * Math.cos(-angle);
        return <PitchClass key={i} note={note} x={x} y={y} idx={i} onClick={() => handleSlotClicked(note, i, x, y)} selected={i === activeIndex} />;
      });

    const lines = notes.map((note, i) => {
        const angle1 = (i / notes.length) * 2 * Math.PI;
        const angle2 = ((i+1) / notes.length) * 2 * Math.PI;
        const angle = (angle1 + angle2) * 0.5
        const x1 = width / 2 + outerRadius * Math.cos(angle);
        const y1 = height / 2 + outerRadius * Math.sin(angle);
        const x2 = width / 2 + 0.5 * Math.cos(angle);
        const y2 = height / 2 + 0.5 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
    });

    return (
        <div>
            <svg width={width} height={height}>
                <circle cx={width / 2} cy={height / 2} r={outerRadius} stroke="black" fill="none" />
                <circle cx={width / 2} cy={height / 2} r={innerRadius} stroke="black" fill="none" />
                {lines}
                {circleNotes}
            </svg>
            {activePosition && activeNote && activeIndex != null && (
                <div>
                    <NoteSelector
                        position={activePosition}
                        activeNote={activeNote}
                        activeIndex={activeIndex}
                        onNoteSelected={handleNoteSelected}
                    />
                </div>
            )}
        </div>
    )
}