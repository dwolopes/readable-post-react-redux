import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';
import './App.css';
import { handledInitialData } from '../../actions/shared';
import PostDetail from '../postdetail/PostDetail';

import Theme from '../theme/Theme';

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(handledInitialData());
  }

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <Route exact path='/' component={Theme} />
          <Route exact path='/:category' component={Theme} />
          <Route exact path='/posts/:id' render={(props) => <PostDetail {...props} />} />
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App)
