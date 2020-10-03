import React from 'react';
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
                    <Navbar.Brand href='/'>
                        <img src="https://img.icons8.com/carbon-copy/45/000000/shop.png"/>
                        ProShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <Nav.Link href='/cart'>
                                <i className='fas fa-shopping-cart mr-1' /> Cart
                            </Nav.Link>
                            <Nav.Link href='/login'>
                                <i className='fas fa-user mr-1' /> Sign In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;