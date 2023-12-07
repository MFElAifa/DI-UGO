import {requests} from '../agent';
import {
    CUSTOMERS_REQUEST, 
    CUSTOMERS_RECEIVED,
    CUSTOMERS_ERROR, 
    ORDERS_REQUEST, 
    ORDERS_ERROR, 
    ORDERS_RECEIVED

    
} from './constants';



// Customers
export const customersRequest  = () => {
    return {
        type: CUSTOMERS_REQUEST
    }
};

export const customersError  = (error) => {
    return {
        type: CUSTOMERS_ERROR,
        error
    }
};

export const customersReceived  = (data) => {
    return {
        type: CUSTOMERS_RECEIVED,
        data 
    }
};


export const customersFetch  = () => {
    let url = `/customers/`;
    return (dispatch) => {
        dispatch(customersRequest());
        return requests.get(url)
            .then(response => dispatch(customersReceived(response)))
            .catch(error =>dispatch(customersError(error)));
    }
};


// Orders
export const ordersRequest  = () => {
    return {
        type: ORDERS_REQUEST
    }
};

export const ordersError  = (error) => {
    return {
        type: ORDERS_ERROR,
        error
    }
};

export const ordersReceived  = (data) => {
    return {
        type: ORDERS_RECEIVED,
        data 
    }
};


export const ordersFetch  = (customerId) => {
    let url = `/customers/${customerId}/orders`;
    return (dispatch) => {
        dispatch(ordersRequest());
        return requests.get(url)
            .then(response => dispatch(ordersReceived(response)))
            .catch(error =>dispatch(ordersError(error)));
    }
};




