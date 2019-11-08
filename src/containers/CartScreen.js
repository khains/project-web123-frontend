import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
// import axios from "axios";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default class CartScreen extends Component {
    state={
        
    }

    onDelete = () => {
        sessionStorage.removeItem("items");
        window.location.reload();
    }

    render() {
        
        var items = JSON.parse(sessionStorage.getItem("items"));
        console.log(items);
        
        return (
            <div>
                <NavBar
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <div className="row">
                    <div className="col-1"></div>
                        <div className="col-10 text-center">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">MY CART</th>
                                        <th scope="col">Size </th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price </th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th scope="col"><img className= "cart-img"
                                            src={items ? items.image : ""} /></th>
                                        <th scope="col">{items ? items.size : ""}</th>
                                        <th scope="col">{items ? items.quantity : ""}</th>
                                        <th scope="col">{items ? items.price : ""} </th>
                                        <th scope="col">{items ? items.subTotal : ""}</th>
                                    
                                        <button onClick = {this.onDelete} type="click" className="delete">Delete</button>
                                        
                                    </tr>
                                </tbody>
                                <p>{items ? items.name : ""}</p>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <PayPalButton
                            amount="100"
                            onSuccess={(details, data) => {
                                alert("Transaction completed by " + details.payer.name.given_name);

                                // OPTIONAL: Call your server to save the transaction
                                return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                        orderID: data.orderID
                                    })
                                });
                            }}
                        />
                    </div>

                <Footer />
            </div>
        )
    }
}
