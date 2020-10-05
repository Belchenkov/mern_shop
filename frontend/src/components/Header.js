import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Navbar,
    Container,
    Nav
} from "react-bootstrap";

const Header = () => {
    return (
        <header className="header">
            <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img
                                alt="logo"
                                src="https://img.icons8.com/carbon-copy/45/000000/shop.png"/>
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart mr-1' /> Cart
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className='fas fa-user mr-1' /> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;