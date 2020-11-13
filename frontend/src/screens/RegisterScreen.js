import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>

            { message && <Message variant="danger">{message}</Message> }
            { error && <Message variant="danger">{error}</Message> }
            { loading && <Loader /> }

            { !loading && (
                <>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>
                                <i className="fas fa-address-card mr-1" />
                                Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>
                                <i className="fas fa-at mr-1" />
                                Email Address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>
                                <i className="fas fa-key mr-1" />
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>
                                <i className="fas fa-key mr-1" />
                                Confirm Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            <i className="fas fa-user-plus mr-1" />
                            Register
                        </Button>
                    </Form>

                    <Row className="py-4">
                        <Col>
                            Have an Account?
                            <Link
                                className="ml-2 font-weight-bold"
                                to={redirect ? `/login?redirect=${redirect}`: '/login'}
                            >Login</Link>
                        </Col>
                    </Row>
                </>
            ) }
        </FormContainer>
    );
};

export default RegisterScreen;