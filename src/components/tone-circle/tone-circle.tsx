import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react'
import Draggable from 'react-draggable'
import './tone-circle.scss';

import { PitchClass } from '../pitch-class'
import { NOTES, Note } from '../../common'
import { NoteSelector } from '../event-selector';

export interface ToneCircleProps {
    minHeight?: number;
    minWidth?: number;
}

export const ToneCircle = (props: ToneCircleProps) => {
    const [modalSize, setModalSize] = useState({ width: 400, height: 300 });
    const [activeNote, setActiveNote] = useState<Note | null>()
    const [activeIndex, setActiveIndex] = useState<number | null>()
    const [activePosition, setActivePosition] = useState<{ x: number, y: number} | null>()
    const [notes, setNotes] = useState<Note[]>([...NOTES])

    const minHeight = props.minHeight !== undefined ? props.minHeight : 64;
    const minWidth = props.minWidth !== undefined ? props.minWidth : 128;
    
    const handleSlotClicked = (note: Note, idx: number, event: React.MouseEvent) => {
        setActiveNote(note)
        setActiveIndex(idx)
        setActivePosition({ x: event.clientX, y: event.clientY })
    }

    const handleNoteSelected = (idx: number, newNote: Note) => {
        setNotes(notes.map((v, i) => idx === i ? newNote : v));
        setActiveNote(null);
        setActiveIndex(null);
        setActivePosition(null);
    }
    
    const outerRadius = Math.min(modalSize.width, modalSize.height) * 0.4;
    const innerRadius = Math.min(modalSize.width, modalSize.height) * 0.3;

    const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const ax = e.clientX
        const ay = e.clientY
        
        const onMouseMove = (e: MouseEvent) => {
            setModalSize({
                width: Math.max(minWidth, modalSize.width + (e.clientX - ax)),
                height: Math.max(minHeight, modalSize.height + (e.clientY - ay))
            });
        }
        
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    const modalStyle: CSSProperties = {
        width: modalSize.width,
        height: modalSize.height
    }

    const circleNotes = notes.map((note, i) => {
        const angle = (i / notes.length) * 2 * Math.PI;
        const x = modalSize.width / 2 + (innerRadius + outerRadius) * -0.5 * Math.sin(-angle);
        const y = modalSize.height / 2 + (innerRadius + outerRadius) * -0.5 * Math.cos(-angle);
        return <PitchClass key={i} note={note} x={x} y={y} idx={i} onClick={(i, event) => handleSlotClicked(note, i, event)} selected={i === activeIndex} />;
      });

    const lines = notes.map((note, i) => {
        const angle1 = (i / notes.length) * 2 * Math.PI;
        const angle2 = ((i+1) / notes.length) * 2 * Math.PI;
        const angle = (angle1 + angle2) * 0.5
        const x1 = modalSize.width / 2 + outerRadius * Math.cos(angle);
        const y1 = modalSize.height / 2 + outerRadius * Math.sin(angle);
        const x2 = modalSize.width / 2 + 0.5 * Math.cos(angle);
        const y2 = modalSize.height / 2 + 0.5 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
    });

    return (
        <div>
            <Draggable handle='.handle' bounds=".app">
                <div className='window-background' style={modalStyle}>
                    <div className="handle"><b>Tone Circle</b></div>

                    <div className='window-body'>
                        <svg width={modalSize.width} height={modalSize.height}>
                            <circle cx={modalSize.width / 2} cy={modalSize.height / 2} r={outerRadius} stroke="black" fill="none" />
                            <circle cx={modalSize.width / 2} cy={modalSize.height / 2} r={innerRadius} stroke="black" fill="none" />
                            {lines}
                            {circleNotes}
                        </svg>
                    </div>

                    <div
                        className="resize-handle"
                        data-direction="se"
                        onMouseDown={handleResize}
                    />
                </div>
            </Draggable>
            
            {activePosition && activeNote && activeIndex != null && (
                <NoteSelector
                    position={activePosition}
                    activeNote={activeNote}
                    activeIndex={activeIndex}
                    onNoteSelected={handleNoteSelected}
                />
            )}
        </div>
    )
}
