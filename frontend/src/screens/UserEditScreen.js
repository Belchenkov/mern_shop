import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            const { name, email, isAdmin } = user;

            setName(name);
            setEmail(email);
            setIsAdmin(isAdmin);
        }
    }, [userId, dispatch, user])

    const submitHandler = e => {
        e.preventDefault();

    };

    return (
        <>
            <Link to="/admin/users" className="btn btn-light my-3">
                <i className="far fa-arrow-alt-circle-left mr-1" />
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>

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
                            <Form.Group controlId="isAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="Is Admin"
                                    checked={isAdmin}
                                    onChange={e => setIsAdmin(e.target.checked)}
                                />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                <i className="fas fa-user-edit mr-1" />
                                Update
                            </Button>
                        </Form>
                    </>
                ) }
            </FormContainer>
        </>
    );
};

export default UserEditScreen;