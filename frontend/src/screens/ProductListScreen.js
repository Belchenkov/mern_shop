import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
    Table,
    Button,
    Row,
    Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteProduct, listProducts } from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, successDelete])

    const createProductHandler = () => {

    };

    const deleteProductHandler = id => {
        if (window.confirm('Are you sure?')) {
           dispatch(deleteProduct(id));
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                    <Col className="text-right">
                        <Button
                            className="my-2"
                            variant="primary"
                            onClick={createProductHandler}
                        >
                            <i className="fas fa-plus mr-1" />
                            Create Product
                        </Button>
                    </Col>
                </Col>
            </Row>

            { error && <Message variant="danger">{error}</Message> }
            { loading && <Loader /> }

            { errorDelete && <Message variant="danger">{errorDelete}</Message> }
            { loadingDelete && <Loader /> }

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
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={product._id}>
                                    <td>{ i + 1 }</td>
                                    <td>{ product._id }</td>
                                    <td>{ product.name }</td>
                                    <td>${ product.price }</td>
                                    <td>{ product.category }</td>
                                    <td>{ product.brand }</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
                                            onClick={() => deleteProductHandler(product._id)}
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

export default ProductListScreen;