import { 
    ORDERS_REQUEST, 
    ORDERS_ERROR, 
    ORDERS_RECEIVED

} from "../actions/constants";

const ordersListReducer = (state = {
    orders: null,
    isFetching: false
}, action) => {
    switch(action.type){
        case ORDERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case ORDERS_RECEIVED:
            return {
                ...state,
                orders: action.data.data,
                isFetching: false
            };
        case ORDERS_ERROR:
            return {
                ...state,
                isFetching: false,
                orders: null
            };
        default:
            return state;
    };
};

export default ordersListReducer;