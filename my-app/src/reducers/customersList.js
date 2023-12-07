import { 
    CUSTOMERS_REQUEST, 
    CUSTOMERS_ERROR, 
    CUSTOMERS_RECEIVED

} from "../actions/constants";

const customersListReducer = (state = {
    customers: null,
    isFetching: false
}, action) => {
    switch(action.type){
        case CUSTOMERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case CUSTOMERS_RECEIVED:
            return {
                ...state,
                customers: action.data.data,
                isFetching: false
            };
        case CUSTOMERS_ERROR:
            return {
                ...state,
                isFetching: false,
                customers: null
            };
        default:
            return state;
    };
};

export default customersListReducer;