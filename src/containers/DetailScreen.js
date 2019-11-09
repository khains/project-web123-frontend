import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Product from "../components/Product";
import InfoProduct from "../components/InfoProduct";
import axios from "../axios";

export default class DetailScreen extends Component {
    state = {
        mer : []
    };

    componentDidMount() {
        axios
            .get(`/api/merchandise/${this.props.match.params.merId}`)
            .then(data => {
                this.setState({mer : data.data.data});
            })
            .catch(error => console.log(error));
    }
   
    
    onDetail = (event) => {
        event.preventDefault();
        var items = {
            name : this.state.mer.name,
            image : this.state.mer.image,
            size : document.getElementById("size").value,
            quantity : document.getElementById("quantity").value,
            price : this.state.mer.price,
            subTotal : (document.getElementById("quantity").value * this.state.mer.price)
        };
        
        sessionStorage.setItem("items", JSON.stringify(items));

        this.props.history.push("/cart")
    }

    render() {
        const description = this.state.mer  ? 
            this.state.mer.description : "";
        return (
            <div >
                <NavBar
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <div className="main_content container">
                    <form onSubmit={this.onDetail}>
                        <div className="row">
                            <div className="img-detail col-6">
                                {this.state.mer ? <Product img={this.state.mer} /> :""}
                            </div>
                            <div className="infoproduct col-6" >
                                <div>
                                    {this.state.mer ? <InfoProduct inf={this.state.mer} /> : ""}
                                </div>
                                <div className="description">
                                    {description}
                                </div>
                                <div className="size">
                                    <p>Size:</p>
                                    <select id="size" class="form-control">
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select>
                                </div>
                                <div className="quantity">
                                    <p>Quantity: </p>
                                    <input id="quantity" type="number" defaultValue="1" name="quantity" min="1" max="100"/>
                                </div>
                                <div className="btn-addtocart">
                                    <button type="submit" className="btn btn-secondary btn-lg">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}