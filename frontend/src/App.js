import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
    Container
} from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/login" component={LoginScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
  );
}

export default App;
