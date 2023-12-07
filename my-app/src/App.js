import Header from './components/Header';
import { Route, Switch } from "react-router-dom";
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';

function App() {
  return (
    <div>
          <Header />
          <Switch>
            <Route path={"/customers/:id/orders"} render={props => <OrderList {...props} />}  />
            <Route path={"/"}  render={props => <CustomerList {...props}  />}  />
          </Switch>
    </div>
  );
}

export default App;
