import React, { useState } from 'react';
import {
    Form,
    Button
} from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = e => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                placeholder="Search Products..."
                className="mr-sm-2 ml-sm-5"
                onChange={e => setKeyword(e.target.value)}
            />
            <Button
                type="submit"
                variant="outline-info"
                className="p-2 btn-sm"
            >
                <i className="fas fa-search mr-1" />
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;