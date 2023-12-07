import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import customersList from "./reducers/customersList";
import ordersList from "./reducers/ordersList";
import {reducer as formReducer} from "redux-form";

const createRootReducer = (history) => combineReducers({
  customersList,
  ordersList,
  router: connectRouter(history),
  form: formReducer
})
export default createRootReducer