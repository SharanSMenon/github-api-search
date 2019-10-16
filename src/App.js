import React, { Component } from "react";
import { Route, withRouter } from 'react-router-dom';
import auth0Client from './auth/Auth';
import Public from './components/Public';
import Protected from './components/Protected/Protected';
import Callback from './components/Callback/Callback';
import SecuredRoute from './components/SecuredRoute/SecuredRoute';
import NavBar from './NavBar'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
    console.log(auth0Client.isAuthenticated());
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
  }

  render() {
    return (
      <div className="h-screen bg-blue-lighter text-center">
        <NavBar />
        <Route component={Public} path='/' exact />
        <Route component={Callback} path='/callback' />
        <SecuredRoute path='/protected'
          component={Protected}
          checkingSession={this.state.checkingSession} />
      </div>



    );
  }
}

export default withRouter(App);