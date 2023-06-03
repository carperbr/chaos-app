import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import './appbar.scss';

export const AppBar = () => {
    return (
        <Navbar bg="dark" variant="dark" className="appbar">
            <Container>
                <Navbar.Brand>Musical Chaos Theory</Navbar.Brand>
                <Nav className="me-auto">
                    <div>
                        Fretboard
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}