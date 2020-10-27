import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Table,
    Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../actions/userActions";

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
        const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login');
        }
    }, [dispatch, history])

    const deleteUser = id => {
        console.log(id)
    };

    return (
        <>
            <h1>Users</h1>

            { error && <Message variant="danger">{error}</Message> }
            { loading && <Loader /> }

            {
                !loading && !error && (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm text-center"
                    >
                        <thead className="bg-secondary text-white shadow">
                        <tr>
                            <th />
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, i) => (
                                <tr key={user._id}>
                                    <td>{ i + 1 }</td>
                                    <td>{ user._id }</td>
                                    <td>{ user.name }</td>
                                    <td>
                                        <a href={`mailto:${user.email}`}>{ user.email }</a>
                                    </td>
                                    <td>
                                        {
                                            user.isAdmin
                                                ? <i className="fas fa-check" style={{color: 'green'}} />
                                                : <i className="fas fa-times" style={{color: 'red'}} />
                                        }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/user/${user._id}/edit`}>
                                            <Button
                                                variant="primary"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit" />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm ml-4"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            <i className="fas fa-trash" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                )
            }
        </>
    );
};

export default UserListScreen;