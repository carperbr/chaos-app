import React, { useState, useRef, ReactNode, CSSProperties } from 'react';
import Draggable from 'react-draggable'
import './resizable-modal.scss';

interface ResizableModalProps {
    title: string;
    minHeight?: number;
    minWidth?: number;
    isOpen: boolean;
    children: ReactNode;
}

export const ResizableModal = (props: ResizableModalProps) => {
    const [modalSize, setModalSize] = useState({ width: 400, height: 300 });

    const minHeight = props.minHeight !== undefined ? props.minHeight : 64;
    const minWidth = props.minWidth !== undefined ? props.minWidth : 128;

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

    if (!props.isOpen) {
        return null;
    }

    const modalStyle: CSSProperties = {
        width: modalSize.width,
        height: modalSize.height
    }

    return (
        <Draggable handle='.handle'>
            <div className='window-background' style={modalStyle}>
                <div className="handle">{props.title}</div>

                <div className='window-body'>
                    {props.children}
                </div>

                <div
                    className="resize-handle"
                    data-direction="se"
                    onMouseDown={handleResize}
                />
            </div>
        </Draggable>
    )
}