import React from 'react';
import { Link } from 'react-router-dom';
import Message from './Message';
import Spinner from './Spinner';
 import {connect} from 'react-redux';
import {customersFetch} from '../actions/actions';


const mapStateToPropos = state => ({
    ...state.customersList
});

const mapDispatchToPropos = {
    customersFetch
};

class CustomerList extends React.Component{
    componentDidMount() {
        if(this.props.isFetching === false) {
            this.props.customersFetch();
        }
    }

    render(){
        const {customers, isFetching} = this.props;
        if(isFetching){
            return (<Spinner />);
        }

        if(null === customers || 0 === customers.length){
            return (<Message message="No Data!" />);
        }

        const renderTitle = (titleId) => {
            return titleId === 1 ? "Mme" : "M";
        }
        
        return (
            
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Title</th>
                            <th scope='col'>Lastname</th>
                            <th scope='col'>Firstname</th>
                            <th scope='col'>Postal code</th>
                            <th scope='#'>City</th>
                            <th scope='#'>Email</th>
                            <th scope='#'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers && customers.map(customer => (
                            
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{ renderTitle(customer.civility) }</td>
                                <td>{customer.lastname}</td>
                                <td>{customer.firstname}</td>
                                <td>{customer.postalCode}</td>
                                <td>{customer.city}</td>
                                <td>{customer.email}</td>
                                <td><Link  to={`/customers/${customer.id}/orders`}> Show Orders</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        );
    }
}

export default connect(mapStateToPropos, mapDispatchToPropos)(CustomerList);