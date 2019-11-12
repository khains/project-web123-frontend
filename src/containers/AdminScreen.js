import React, { Component } from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "../axios";


export default class AdminScreen extends Component {

    onSubmit = () => {
        
        axios
            .post("/api/merchandise", {
                id: document.getElementById("id").value,
                name: document.getElementById("name").value,
                image: document.getElementById("image").value,
                price: document.getElementById("price").value,
                size: document.getElementById("size").value,
                description: document.getElementById("description").value,
                types: document.getElementById("types").value
            })
            .then((res) => {
                
                if(res.data.success==="true"){
                    alert(res.data.message);
                }
                else{
                    alert(res.data.message);
                }
                this.props.history.push("/admin")
            }).catch(err => console.error(err));
        
    }

    render() {
        return (
            <div>
                <NavBar
                    username={this.props.username}
                    onLogin={this.props.onLogin}
                />
                <div className = "container"> 
                    <div className="text-center textadmin">
                        <p>ADD NEW MERCHANDISE</p>   
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input id="id"  className="form-control" name="id" type="text" placeholder="id" required/>
                        </div>
                        <div className="form-group">
                            <input id="name"  className="form-control" name="name" type="text" placeholder="name" required/>
                        </div>
                        <div className="form-group">
                            <input id="image" className="form-control" name="image" type="text" placeholder="image" required/>
                        </div>
                        <div className="form-group">
                            <input id="size" className="form-control" name="size" type="text" placeholder="size" required/>
                        </div>
                        <div className="form-group">
                            <input id="description" className="form-control" name="description" type="text" placeholder="description" required/>
                        </div>
                        <div className="form-group">
                            <input id="price" className="form-control" name="price" type="text" placeholder="price" required/>
                        </div>
                        <div className="form-group">
                            <input id="types" className="form-control" name="types" type="text" placeholder="types" required/>
                        </div>

                        <div className="text-center">
                            <button className="btn btn-danger" type="submit">Create</button>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

