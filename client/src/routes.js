import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './lib/routeUtils';

import Dashboard from './scenes/Dashboard';
import MyDonations from './scenes/MyDonations';
import EditProfile from './scenes/EditProfile';
import Authenticate from './scenes/Authenticate';
import NoMatch from './scenes/NoMatch';

export default (
	<Switch>
		<Redirect exact from="/" to="/dashboard"/>
		<PrivateRoute path="/dashboard" component={Dashboard} />
		<PrivateRoute path="/my-donations" component={MyDonations} />
		<PrivateRoute path="/profile" component={EditProfile} />
		<Route path="/authenticate" component={Authenticate} />
		<Route component={NoMatch}/>
	</Switch>
);
