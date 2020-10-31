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
import { listProductDetails } from "../actions/productActions";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [dispatch, history, productId, product])

    const submitHandler = e => {
        e.preventDefault();
    };

    return (
        <>
            <Link to="/admin/products" className="btn btn-light my-1">
                <i className="far fa-arrow-alt-circle-left mr-1" />
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

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
                            <Form.Group controlId="price">
                                <Form.Label>
                                    <i className="fas fa-dollar-sign mr-1" />
                                    Price
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>
                                    <i className="far fa-image mr-1" />
                                    Image
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    value={image}
                                    onChange={e => setImage(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="brand">
                                <Form.Label>
                                    <i className="far fa-copyright mr-1" />
                                    Brand
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter brand"
                                    value={brand}
                                    onChange={e => setBrand(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="countInStock">
                                <Form.Label>
                                    <i className="fas fa-calculator mr-1" />
                                    Count In Stock
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter count in stock"
                                    value={countInStock}
                                    onChange={e => setCountInStock(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="category">
                                <Form.Label>
                                    <i className="fas fa-tag mr-1" />
                                    Category
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>
                                    <i className="far fa-clipboard mr-1" />
                                    Description
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary">
                                <i className="far fa-edit mr-1" />
                                Update
                            </Button>
                        </Form>
                    </>
                ) }
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;