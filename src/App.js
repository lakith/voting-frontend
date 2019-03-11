import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import HomepageLayout from './containers/home/home';
import Register from './containers/auth/register/Register';
import Login from './containers/auth/login/login';
import Competation from './containers/competation/competation';
import Department from './containers/department/department';
import Competitor from './containers/competitors/competitors';
import HeaderExampleSettingsIcon from './containers/VoteSuccess/voteSucess';
import logout from './containers/auth/logout/logout/logout';
import {connect} from 'react-redux'
import * as actions from './store/index'

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
              <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login"  component={Login}/>
                <Route path="/competation" component={Competation} />
                <Route path="/department" component={Department} />
                <Route path="/competitors" component={Competitor} />
                <Route path="/success" component={HeaderExampleSettingsIcon} />
                <Route path="/logout" component={logout} />
                <Route path="/" exact component={HomepageLayout} />
                <Redirect to="/" />
              </Switch>
  )

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.accessToken != null
  }
};

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp : () => dispatch (actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
