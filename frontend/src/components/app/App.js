import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';

import './App.css';
import { handledInitialData } from '../../actions/shared';
import PostDetail from '../postdetail/PostDetail';
import PageNotFound from '../page-not-found/PageNotFound';
import Theme from '../theme/Theme';

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(handledInitialData());
  }

  render() {

    console.log ('loading', this.props.loading);

    return (
      <Router>
        <Fragment>
          <LoadingBar/>
            {
              this.props.loading === true 
                ? null
              : <Switch>
                  <Route exact path='/' component={Theme} />
                  <Route exact path='/posts/:id' render={(props) => <PostDetail {...props} />} />
                  <Route exact path='/pageNotFound' component={PageNotFound}/>
                  <Route exact path='/:category' component={Theme} />
                </Switch>
            }
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({loading}) {
  return {
    loading
  }
}

export default connect(mapStateToProps)(App)
