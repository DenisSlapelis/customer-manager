import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home/home.component';
// import CustomerManagerPage from '../pages/customer-manager/customer-manager.component';
// import NewCustomerPage from '../pages/new-customer/new-customer.component';
// import UpdateCustomerPage from '../pages/update-customer/update-customer.component';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomePage} />
            {/* <Route path='/customer-manager' component={CustomerManagerPage} /> */}
            {/* <Route path='/new-customer' component={NewCustomerPage} /> */}
            {/* <Route path='/update-customer' component={UpdateCustomerPage} /> */}
        </Switch>
    </BrowserRouter>
)

export default Routes;







