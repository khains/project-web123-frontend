import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import axios from '../axios'
import Footer from "../components/Footer";
// import axios from "axios";


export default class HomeScreen extends Component {
    state = {
        merchandises: []

    };

    componentDidMount() {
        axios
            .get("/api/merchandise")
            .then(data => {
                console.log(data.data);
                this.setState({
                    merchandises: data.data
                });
            })
            .catch(err => console.error(err));
    }
    render() {

        return (
            <div>
                <NavBar
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <div className="row container">
                    <div className="col-4 shopping1">
                        <a>
                            <div className="shopping2">
                                <p className="shopping3 conatiner" >
                                    Introducing Your
                                    New Workout Wardrobe
                                </p>

                                <a href="/shop">
                                    <button className="shopping4">
                                        Start Shopping
                                    </button>
                                </a>
                            </div>
                        </a>
                    </div>
                    <div className="col-8 " >
                        <img className="imgHome" src="https://i.imgur.com/rL9wGYm.jpg" />
                    </div>
                </div>
                <div>
                    <p></p>
                </div>
                <div className="row ">
                    <div className="col-4 " >
                        <a href="/about" >
                            <img className="images" src="https://i.imgur.com/ivTWXAe.jpg" />
                        </a>
                    </div>
                    <div className="col-4 ">
                        <a href="/shop">
                            <img className="images" src="https://i.imgur.com/8Ee6CA1.jpg" />
                        </a>
                    </div>
                    <div className="col-4 ">
                        <a href="#">
                            <img className="images" src="https://i.imgur.com/MV04LwM.jpg" />
                        </a>
                    </div>
                </div>
                <div className="text-center textHome container">
                    <p>
                        LATEST ARRIVALS
                    </p>
                </div>
                <div className="row">
                    <div className="col-3">
                        <a href="merchandise/5dc401c7b873aa15bc695da0">
                            <img className="images1" src="https://i.imgur.com/sxnMT3b.jpg" />
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="/merchandise/5dc400c2b873aa15bc695d9e">
                            <img className="images1" src="https://i.imgur.com/Gkc5r1H.jpg" />
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="/merchandise/5dc403efb873aa15bc695db1">
                            <img className="images1" src="https://i.imgur.com/l2i2f8l.jpg" />
                        </a>
                    </div>
                    <div className="col-3">
                        <a href="/merchandise/5dc4006db873aa15bc695d9c">
                            <img className="images1" src="https://i.imgur.com/UYLczCQ.jpg" />
                        </a>
                    </div>
                </div>
                <div className="text-center textHome2">
                    <p>FOLLOW US ON</p>
                    <p>INSTAGRAM</p>
                </div>
                <Footer />
            </div>
        )
    }
}
