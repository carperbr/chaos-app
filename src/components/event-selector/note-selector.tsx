import React from 'react';
import { Note, NOTES } from '../../common'
import './note-selector.scss'

export interface NoteSelectorProps {
    position: { x: number; y: number; }
    activeIndex: number
    activeNote: Note;
    onNoteSelected: (idx: number, note: Note) => void;
    style?: React.CSSProperties
}

export const NoteSelector = (props: NoteSelectorProps) => {
    const handleNoteClick = (idx: number, note: Note) => {
        props.onNoteSelected(idx, note)
    }

    const { position, activeIndex, activeNote } = props
    const noteElements = NOTES.map((note) => (
        <button
            key={note}
            onClick={() => handleNoteClick(activeIndex, note)}
            className={'note' + (note === activeNote ? ' active' : '')}>
                {note}
        </button>
    ))

    return (
        <div
            className="note-selector"
            style={{ position: 'fixed', left: `${position.x}px`, top: `${position.y}px` }}
        >
            {noteElements}
        </div>
    )
}