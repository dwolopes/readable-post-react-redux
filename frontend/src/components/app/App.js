import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading';
import './App.css';
import { handledInitialData } from '../../actions/shared';

class App extends Component {

  componentDidMount () {

    const { dispatch } = this.props;
    dispatch(handledInitialData());

  }

  render() {
    return (
      <div>
        <LoadingBar/>
      </div>
    );
  }
}

export default connect()(App)
