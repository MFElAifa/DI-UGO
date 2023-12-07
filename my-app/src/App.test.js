import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import CustomerList from './components/CustomerList';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import OrderList from './components/OrderList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('TEST CustomerList', () => {
    it('renders with loading spinner', () => {
      const store = mockStore({
        customersList: {
          isFetching: true,
        },
      });

      render(
        <Provider store={store}>
          <CustomerList />
        </Provider>
      );

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders with "No Data!" message when no customers', () => {
      const store = mockStore({
        customersList: {
          isFetching: false,
          customers: []
        }
      });
      
      render(
        <Provider store={store}>
          <CustomerList />
        </Provider>
      );
  
      expect(screen.getByText('No Data!')).toBeInTheDocument();
    });


    it('render customers table', async () => {
      const store = mockStore({
        customersList: {
          isFetching: false,
          customers: [
            {
              id: 1,
              civility: 1,
              lastname: 'Doe',
              firstname: 'John',
              postalCode: '12345',
              city: 'Cityville',
              email: 'john@example.com',
            }
          ]
        }
      });
  
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CustomerList />
          </Provider>
        </BrowserRouter>
      );
  
      await waitFor(() => {
          expect(screen.getByText('Mme')).toBeInTheDocument();
          expect(screen.getByText('Doe')).toBeInTheDocument();
          expect(screen.getByText('John')).toBeInTheDocument();
          expect(screen.getByText('12345')).toBeInTheDocument();
          expect(screen.getByText('Cityville')).toBeInTheDocument();
          expect(screen.getByText('john@example.com')).toBeInTheDocument();
          expect(screen.getByText('Show Orders')).toBeInTheDocument();
      });
    });

    it('calls customersFetch action on mount', () => {
      const store = mockStore({
        customersList: {
          isFetching: false,
          customers: [],
        },
      });
  
      render(
        <Provider store={store}>
          <CustomerList />
        </Provider>
      );
  
      expect(store.getActions()).toEqual([{ type: 'CUSTOMERS_REQUEST' }]);
    });

    it('navigates to orders page when "Show Orders" link is clicked', async () => {
      const store = mockStore({
        customersList: {
          isFetching: false,
          customers: [
            {
              id: 1,
              civility: 1,
              lastname: 'Doe',
              firstname: 'John',
              postalCode: '12345',
              city: 'Cityville',
              email: 'john@example.com',
            },
          ],
        },
      });
  
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CustomerList />
          </Provider>
        </BrowserRouter>
      );
  
      await waitFor(() => {
        userEvent.click(screen.getByText('Show Orders'));
        expect(store.getActions()).toEqual([{
          "type": "ORDERS_REQUEST",
          "type": "CUSTOMERS_REQUEST",
        }]);
      });
    });

});



// Orders

describe('TEST OrderList', () => {
  it('renders with loading spinner', () => {
    const store = mockStore({
      ordersList: {
        isFetching: true,
      },
    });

    render(
      <Provider store={store}>
        <OrderList />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders with "No Data!" message when no orders', () => {
    const store = mockStore({
      ordersList: {
        isFetching: false,
        orders: []
      }
    });
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/customers/1/orders']}>
          <Route path="/customers/:id/orders">
            {(props) => <OrderList match={{ params: { id: '1' } }} {...props} />}
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No Data!')).toBeInTheDocument();
  });


  it('render customers table', async () => {
    const store = mockStore({
      ordersList: {
        isFetching: false,
        orders: [
          {
            id: '1',
            customer: {
              lastname: "JOHN"
            },
            identifier: '01/01',
            product_id: '12345',
            quantity: '10',
            price: '20',
            currency: 'euros',
            date: '2023-10-10',
            
          }
        ]
      }
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/customers/1/orders']}>
            <Route path="/customers/:id/orders">
              {(props) => <OrderList match={{ params: { id: '1' } }} {...props} />}
            </Route>
          </MemoryRouter>
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('JOHN')).toBeInTheDocument();
        expect(screen.getByText('01/01')).toBeInTheDocument();
        expect(screen.getByText('12345')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('20')).toBeInTheDocument();
        expect(screen.getByText('euros')).toBeInTheDocument();
        expect(screen.getByText('2023-10-10')).toBeInTheDocument();
    });
  });

  it('calls customersFetch action on mount', () => {
    const store = mockStore({
      ordersList: {
        isFetching: false,
        orders: [],
      },
    });

    render(
      <Provider store={store}>
         <MemoryRouter initialEntries={['/customers/1/orders']}>
            <Route path="/customers/:id/orders">
              {(props) => <OrderList match={{ params: { id: '1' } }} {...props} />}
            </Route>
          </MemoryRouter>
      </Provider>
    );

    expect(store.getActions()).toEqual([{ type: 'ORDERS_REQUEST' }]);
  });

});