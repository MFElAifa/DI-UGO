import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                    DI-UGO
                </Link>
                
                
                <ul className="navbar-nav mr-auto">
                    
                </ul> 
            </nav>
        );
    }
}