import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TodosList from "../components/TodosList"
import TodoItem from "../components/TodoItem"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import ErrorPage from "../components/ErrorPage"
import TodoForm from "./TodoForm"
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
            <Route exact path="/todos/new" render={routeProps => <TodoForm {...routeProps}/>}/>
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