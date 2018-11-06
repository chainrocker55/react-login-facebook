import React, { Component } from 'react'
//import FacebookLogin from 'react-facebook-login'
import 'bulma/css/bulma.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password:''
        }
    }

    check() {
        var password = document.getElementById('password').value
        var repassword = document.getElementById('repassword').value
        document.getElementById("erEmail").innerHTML = "";
        var emailFilter = /^.+@.+\..{2,3}$/;//รูปแบบการเช็คว่าถกต้องหรือป่าว
        var email = document.getElementById('email').value
        if (!(emailFilter.test(email))) {
            document.getElementById("erEmail").innerHTML = "This email is invalid"
        } else {
            console.log(password)
            console.log(repassword)
            if (password === repassword) {
                console.log(true)
                document.getElementById('er').innerHTML = null
                axios.post('https://express-api-001.herokuapp.com/todo',{
                    email:email,
                    password:password
                })
                .then((res,req) => {
                   // console.log(req)
                   //this.props.history.push('/')
                    window.location.replace('/');
                })
            } else {
                document.getElementById('er').innerHTML = "password กับ Re-passwoed ไม่ตรงกัน"
            }
        }

    }
    render() {
        return (
            <div>
                <section className="hero  is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">Register</h3>
                                <div className="box">
                                    <form>
                                        <div className="field">
                                            <div className="control">
                                                <input id="email" className="input is-large" type="email" placeholder="Your Email" autoFocus=""></input>
                                            </div>
                                            <p id="erEmail" className="has-text-danger"></p>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input id="password" className="input is-large" type="password" placeholder="Your Password"></input>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input id="repassword" className="input is-large" type="password" placeholder="Your Re-Password"></input>
                                            </div>
                                        </div>
                                        <p id="er" className="has-text-danger"></p>
                                        <br></br>
                                        <div className="field">
                                            <a className="button is-link is-fullwidth is-large" onClick={this.check}>Register</a>
                                        </div>

                                    </form>
                                </div>
                                <p className="subtitle has-text-grey">
                                    <Link to="/">Back</Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </section>
            </div>


        )
    }
}
export default Register;