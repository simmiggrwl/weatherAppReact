import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteViews from './RouteViews';

const App = () => (
    <Router>
      <Fragment>
        <RouteViews />
      </Fragment>
    </Router>
);

export default App;