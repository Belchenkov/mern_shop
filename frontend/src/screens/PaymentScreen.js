import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    Button,
    Col
} from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        history.push('/place-order');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col className="mb-3">
                        <Form.Check
                            className="mb-2"
                            label="PayPal or Credit Card"
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            label="Stripe"
                            type="radio"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type="submit" variant="info">
                    Continue
                    <i className="fas fa-long-arrow-alt-right ml-1" />
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;