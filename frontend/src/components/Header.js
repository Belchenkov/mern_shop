import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

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
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                <i className="far fa-id-badge mr-1" />
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <i className="fas fa-sign-out-alt mr-1" />
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className='fas fa-user mr-1' /> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="Admin" id="adminMenu">
                                        <LinkContainer to="/admin/users">
                                            <NavDropdown.Item>
                                                <i className="fas fa-users mr-1" />
                                                Users
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/products">
                                            <NavDropdown.Item>
                                                <i className="fas fa-shopping-basket mr-1" />
                                                Products
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orders">
                                            <NavDropdown.Item>
                                                <i className="fas fa-shopping-bag mr-1" />
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;