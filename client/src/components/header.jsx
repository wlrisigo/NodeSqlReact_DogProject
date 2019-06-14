import React, {Component} from 'react';
import logo from '../logo.png';
import img from "../SpecDoc.pdf";





export default class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="App-Header">
                    <h3><a href = {img} download>Spec Doc </a></h3>
                    <h1>Vermont Dogs</h1>
                    <img className='logo' src={logo} width="400" height="400" alt='logo'/>
                </header>
            </React.Fragment>
        );
    }
}