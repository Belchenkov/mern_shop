import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Button,
    Card
} from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch();
    const orderId = match.params.id;
    const [ sdkReady, setSdkReady ] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderPay = useSelector(state => state.orderPay);
    const { success: successPay, loading: loadingPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

    if (!loading) {
        const addDecimals = num => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.onload = () => {
                setSdkReady(true);
            }

            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])

    const successPaymentHandler = paymentResult => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return (
        loading
            ? <Loader />
        : error
            ? <Message variant="danger">{error}</Message>
            : <>
                <h1>Order {orderId}</h1>
                <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> { order.user.name }
                                        <a href={`mailto:${order.user.email}`}> { order.user.email }</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        { order.shippingAddress.address }, {' '}
                                        { order.shippingAddress.city }, {' '}
                                        { order.shippingAddress.postalCode }, {' '}
                                        { order.shippingAddress.country }
                                    </p>
                                    {
                                        order.isDelivered ? (
                                            <Message variant="success">Delivered on {order.deliveredAt}</Message>
                                        ) : (
                                            <Message variant="warning">Order is not Delivered</Message>
                                        )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        { order.paymentMethod }
                                    </p>
                                    {
                                        order.isPaid ? (
                                            <Message variant="success">Paid on {order.paidAt}</Message>
                                        ) : (
                                            <Message variant="warning">Order is not Paid</Message>
                                        )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    { order.orderItems.length === 0
                                        ? <Message variant="warning">Order is empty</Message>
                                        : (
                                            <ListGroup variant="flush">
                                                { order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={item.product}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    fluid
                                                                    rounded
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>
                                                                    { item.name }
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} X ${item.price} =
                                                                ${Number(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        !order.isPaid && (
                                            <ListGroup.Item className="mt-3">
                                                { loadingPay && <Loader /> }
                                                { !sdkReady
                                                    ? <Loader />
                                                    : (
                                                       <PayPalButton
                                                         amount={order.totalPrice}
                                                         onSuccess={successPaymentHandler}
                                                       />
                                                    )
                                                }
                                            </ListGroup.Item>
                                        )
                                    }

                                    { loadingDeliver && <Loader /> }

                                    {
                                        userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type="button"
                                                    variant="info"
                                                    className="btn btn-block"
                                                    onClick={deliverHandler}
                                                >
                                                    <i className="fas fa-truck mr-1" />
                                                    Mark As Delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )
                                    }
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
              </>
    )
};

export default OrderScreen;