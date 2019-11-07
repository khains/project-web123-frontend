import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
// import axios from "axios";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default class CartScreen extends Component {
    state={
     
    }

    // componentDidMount(){
    //     axios.get("https://unterwasche-api.herokuapp.com/api/cart")
    //     .then(data => {
    //         this.setState({mer : data.data.data});
    //         console.log(this.state.mer);
    //     })
    //     .catch(error => console.log(error));
    // }
    // componentDidMount() {
    //     axios
    //         .get("https://unterwasche-api.herokuapp.com/api/merchandise"+this.props.location.search)
    //         .then(data => {
    //             this.setState({merr : data.data.data});
    //             console.log(this.state.merr);
    //         })
    //         .catch(error => console.log(error));
    // }

    componentDidMount(){
        const name = localStorage.getItem("name");
        const image = localStorage.getItem("image");
        const size = localStorage.getItem("size");
        const quantity = localStorage.getItem("quantity");
        const price = localStorage.getItem("price");
        const subtotal = localStorage.getItem("subtotal");
        this.setState({name, image, size, quantity, price, subtotal});
    }

    render() {
        // var index = this.state.merr ? this.state.merr.length : "";
        // const mer = this.state.mer ? this.state.mer[index-1] : "";
        // const image = index > 0 ? mer.image : "";
        // console.log(this.state.merr ? this.state.merr[0].image : "");
        // console.log(image);
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
                                        src={this.state.image ? this.state.image : ""} /></th>
                                    <th scope="col">{this.state.size ? this.state.size : ""}</th>
                                    <th scope="col">{this.state.quantity ? this.state.quantity : ""}</th>
                                    <th scope="col">{this.state.price ? this.state.price : ""} </th>
                                    <th scope="col">{this.state.subtotal ? this.state.subtotal : ""}</th>
                                    
                                </tr>
                            </tbody>
                            <p>{this.state.name ? this.state.name : ""}</p>
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
