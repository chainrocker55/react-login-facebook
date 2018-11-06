import React, { Component } from 'react';
import { throws } from 'assert';

class Todoitem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.num}</td>
                <td> {this.props.data.time}</td>                                            
            </tr> 
        );
    }
}
export default Todoitem;