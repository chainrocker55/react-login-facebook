import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import FacebookLogin from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import 'bulma/css/bulma.css'
import axios from 'axios'
const timestamp = require('time-stamp')

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            email: null,
            status: 0
        }
        this.responseFacebook = this.responseFacebook.bind(this)
        this.getData = this.getData.bind(this)
    }

    async getData() {
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value

        axios.post('https://express-api-001.herokuapp.com/todo/getUser', {
            email: email,
            password: password
            // }).then((res,req)=>(
            //     console.log(res),
            //     console.log(res.data),
            //     console.log(res.statusText),
            //     console.log(res.status)                       
        }).then((res) => this.setState({
            data: res.data,
            status: res.status,
            email: res.data.email
        }))

        setTimeout(() => {
            console.log(this.state.data)
            console.log(this.state.email)
            if (this.state.email != null) {
                document.getElementById('er').innerHTML = null
                axios.post('https://express-api-001.herokuapp.com/todo/setLogTime', {
                    email: email,
                    time: timestamp.utc('YYYY/MM/DD HH:mm:ss')                   
                })
                this.props.history.push('/home/' + this.state.email)
            }else{
                document.getElementById('er').innerHTML = "Username or Password incorrect"
            }
        }, 2000)
    }
    responseFacebook(response) {

        if (response.email != undefined) {
            //  console.log(response.name)
            //  console.log(response.email)
            //  console.log(response.id)
            //  console.log(response.status)
            document.getElementById('er').innerHTML = null
            console.log(response) 
            setTimeout(() => {      
                    axios.post('https://express-api-001.herokuapp.com/todo/setLogTime', {
                        email: response.email,
                        time: timestamp.utc('YYYY/MM/DD HH:mm:ss')                   
                    })
                    this.props.history.push('/home/' + response.email)
                
            }, 1000)


        } else {
            console.log("Not connect to facebook")
            document.getElementById('er').innerHTML = "Username or Password incorrect"
        }

    }

    render() {
        return (
            <div>
                <section className="hero  is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">Login</h3>
                                <div className="box">
                                    <form>
                                        <div className="field">
                                            <div className="control">
                                                <input id="email" className="input is-large" type="email" placeholder="Your Email" autoFocus=""></input>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input id="password" className="input is-large" type="password" placeholder="Your Password"></input>
                                            </div>
                                        </div>
                                        <p id="er" className="has-text-danger"></p>
                                        <div className="field">
                                            <a className="button is-success is-fullwidth is-large" onClick={this.getData}>Login</a>
                                        </div>

                                        <FacebookLogin
                                            appId='261510491228913'
                                            fields="name,email,picture"

                                            callback={this.responseFacebook}
                                            render={(renderProps) => (
                                                <a className="button is-link is-fullwidth is-large" onClick={renderProps.onClick}>Login with Facebook</a>
                                            )}
                                        />

                                    </form>
                                </div>
                                <p className="subtitle has-text-back">

                                    <Link to="/Register">Sign Up</Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </section>
            </div>


        )
    }
}
export default Login;