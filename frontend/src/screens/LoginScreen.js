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
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            { error && <Message variant="danger">{error}</Message> }
            { loading && <Loader /> }

            { !loading && (
                <>
                    <Form onSubmit={submitHandler}>
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
                        <Button type="submit" variant="primary">
                            <i className="fas fa-sign-in-alt mr-1" />
                            Sign In
                        </Button>
                    </Form>

                    <Row className="py-4">
                        <Col>
                            New Customer?
                            <Link
                                className="ml-2 font-weight-bold"
                                to={redirect ? `/register?redirect=${redirect}`: '/register'}
                            >Register</Link>
                        </Col>
                    </Row>
                </>
            ) }
        </FormContainer>
    );
};

export default LoginScreen;