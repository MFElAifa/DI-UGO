import React from 'react';
import { Route, Switch } from 'react-router';
import Header from './Header';
import CustomerList from './CustomerList';
import OrderList from './OrderList';
import {customersFetch, ordersFetch} from '../actions/actions';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = {
    
};

class App extends React.Component{
    
    
    render(){
        return (
            <div>
                <Header  />
                
                <Switch>
                    <Route path={"/customers/:id/orders"} render={props => <OrderList {...props} />}  />
                    <Route path={"/"}  render={props => <CustomerList {...props} />}  />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);