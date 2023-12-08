import React from 'react';
import Message from './Message';
import Spinner from './Spinner';
import {connect} from 'react-redux';
import {ordersFetch} from '../actions/actions';
import Moment from 'moment';

const mapStateToPropos = state => ({
    ...state.ordersList
});

const mapDispatchToPropos = {
    ordersFetch
};

class OrderList extends React.Component{
    componentDidMount() {
        if(this.props.isFetching === false) {
            this.props.ordersFetch(this.props.match.params.id);
        }
    }

    render(){
        const {orders, isFetching} = this.props;
        if(isFetching){
            return (<Spinner />);
        }

        if(null === orders || 0 === orders.length){
            return (<Message message="No Data!" />);
        }

        const total = orders.reduce((acc, order) => acc + order.price, 0);
        return (
            <div className='row'>
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Lastname</th>
                            <th scope='col'>Identifier</th>
                            <th scope='col'>ProductId</th>
                            <th scope='col'>Quantity</th>
                            <th scope='#'>Price</th>
                            <th scope='#'>Currency</th>
                            <th scope='#'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer.lastname}</td>
                                <td>{order.identifier}</td>
                                <td>{order.product_id}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.currency}</td>
                                <td>{Moment(order.date).format("YYYY-MM-DD")}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" style={{textAlign:'right'}}>
                                <strong>Total :</strong>
                            </td>
                            <td>
                                {total}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToPropos, mapDispatchToPropos)(OrderList);