import React, { Component } from "react";
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import Todoitem from './Todoitem';

import axios from 'axios'
//const newDate = new Date().toLocalString('th-TH', { timeZone: 'Asia/Bangkok' })
 class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            email: this.props.match.params.email,
        }
        this.renderTodoitem = this.renderTodoitem.bind(this)
       axios.post('https://express-api-001.herokuapp.com/todo/getLogTime', {
            email: this.props.match.params.email
        }).then((res) => this.setState({
            data: res.data,
        }))
    }


    
     renderTodoitem() {
        
        return (
            this.state.data.map((row) => {  
                return (
                    <Todoitem key={row._id} num={this.state.data.indexOf(row)+1} data={row} />
                )
            })
        );
    }
    render() {
        return (
            <div>
                <section className="hero  is-fullheight">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <div className="column is-4 is-offset-4">
                                <h3 className="title has-text-grey">Log Time</h3>
                                <div className="box">
                                    <table className="table is-fullwidth">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTodoitem()}                                      
                                        </tbody>
                                    </table>
                                </div>
                                <p className="subtitle has-text-back">

                                    <Link to="/">Log out</Link>

                                </p>

                            </div>

                        </div>

                    </div>

                </section>
            </div>
        )
    }
}

export default Home;