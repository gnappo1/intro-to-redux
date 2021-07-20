import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TodosList from "./TodosList"
import TodoItem from "./TodoItem"
import Navbar from "./Navbar"
import Home from "./Home"
import {connect} from "react-redux"

class App extends Component {

  render() {

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/todos" render={routeProps => <TodosList todos={this.props.todos} {...routeProps}/>}/>  
            <Route path="/todos/:todoId" render={routeProps => {
              const todo = this.props.todos.find(todo => todo.id === parseInt(routeProps.match.params.todoId))
              return <TodoItem {...routeProps} {...todo} />
            }}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (currentState) => {
  return {
    todos: currentState.todos
  }
}

export default connect(mapStateToProps)(App);
