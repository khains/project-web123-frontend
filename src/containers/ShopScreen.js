import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
// import ReactDOM from 'react-dom';
// import InputRange from 'react-input-range'
import PriceRange from '../components/PriceRange';
import axios from '../axios';

import MainContent from "../components/MainContent";


export default class ShopScreen extends Component {
    state = {
        mers: [],
        totalPage : 0,
        page : 1,
        pageSize : 12
    };
    
    componentWillMount() {
        
            axios
            .get(`/api/page?page=${this.state.page}&pageSize=${this.state.pageSize}`)
            .then(data => {
                console.log(data);
                this.setState({
                    totalPage : data.data.totalPage,
                    mers: data.data.data
                });
            })
            .catch(error => console.log(error));
            
    }

    componentDidMount(){
        axios
            .get("/api/merchandise" + this.props.location.search)
            .then(data => {
                // console.log(data.data.data);
                this.setState({ mers: data.data.data });
                // console.log(this.state.mers);
            })
            .catch(error => console.log(error));
    }

    handlePaginationClick = (event) => {
        this.setState({page : Number(event.target.innerText)});
        // const result = Number(event.target.innerText);
        // console.log(this.state.page);
        axios
            .get(`/api/page?page=${event.target.innerText}&pageSize=${this.state.pageSize}`)
            .then(data => {
                console.log(data.data);
                this.setState({mers : data.data.data});
            })
    }

    render() {
        const myArray = [];
        for(let i = 0; i < this.state.totalPage; i++){
            myArray.push(i);
        }
        return (
            <div>
                <NavBar
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                {/* {this.state.images.length > 0 ? 
                    <Product img={this.state.images[0]}/> : ""} */}
                <h2>Filter by</h2>
                <div className="row">
                    <div className="filter col-2">
                        <div className="accordion" id="accordionExample">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link " type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Collection
                                        </button>
                                    </h2>
                                </div>

                                <div id="collapseOne" className={`collapse ${!window.location.search || window.location.search.indexOf('types=') > -1 ? 'show' : ''}`} aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <ul className="list-filter">
                                            <li><a href="/shop?types=Coats and Jackets">Coats and Jackets</a></li>
                                            <li><a href="/shop?types=T-Shirts">T-Shirts</a></li>
                                            <li><a href="/shop?types=Shirts">Shirts</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Price
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className={`collapse ${window.location.search.indexOf('minPrice=') > -1 ? 'show' : ''}`} aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <PriceRange price={this.props.location.search} />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Size
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" className={`collapse ${window.location.search.indexOf('size=') > -1 ? 'show' : ''}`} aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body">
                                        <ul className="list-filter">
                                            <li><a href="/shop?size=S">S</a></li>
                                            <li><a href="/shop?size=M">M</a></li>
                                            <li><a href="/shop?size=L">L</a></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <MainContent mer={this.state.mers} />
                    </div>
                    <div className="container text-center col-3">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link"  aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {myArray.map((item) => {
                                    return (
                                        <li className={this.state.page === item + 1 ? "page-item active" : "page-item"}>
                                            <a className="page-link" onClick={this.handlePaginationClick} >{item + 1}</a>
                                        </li>
                                    );
                                })}
                    
                                <li className="page-item">
                                    <a className="page-link"  aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
