import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter  } from 'connected-react-router';
import { Route } from 'react-router';
import App from './components/App';
import configureStore, { history } from './configureStore'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path={"/"} render={props => <App {...props} />}  />
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);


