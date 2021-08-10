import React from "react";
import { checkAuth } from "../actions/index";
import { NavLink } from 'react-router-dom';
import {connect} from "react-redux"
import Logout from "./Logout";

const link = {
  width: '100px',
  height: '64px',
  padding: '12px',
  margin: '1em 0 2em',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}


class Navbar extends React.Component {
  componentDidMount() {
    this.props.checkAuth();
  }

  renderAuthLinks() {
    const { authChecked, loggedIn, currentUser } = this.props;
    if (authChecked) {
      return loggedIn ? (
        <>
          <NavLink
            to='/protected'
            exact
            style={link}
            activeStyle={{
                background: 'darkblue'
            }}
            >Protected</NavLink>
            <NavLink
            to="/todos"
            exact
            style={link}
            activeStyle={{
                background: 'darkblue'
            }}
            >Todos</NavLink>
            <NavLink
            to="/todos/new"
            exact
            style={link}
            activeStyle={{
                background: 'darkblue'
            }}
            >New Todo</NavLink>
            <Logout />
        </>
      ) : (
        <>
            <NavLink
                to="/"
                exact
                style={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Home</NavLink>
            <NavLink
                to="/login"
                exact
                style={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Login</NavLink>
            <NavLink
                to="/signup"
                exact
                style={link}
                activeStyle={{
                    background: 'darkblue'
                }}
            >Signup</NavLink>
        </>
      );
    } else {
      return null
    }
  }
  
  
    render() {
        return (
            <div  className="mb-3">
                {this.renderAuthLinks()}
            </div>
        )
    }
}

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
    return { authChecked, loggedIn, currentUser };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      checkAuth: () => dispatch(checkAuth())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);