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
import {addTodo, removeTodo} from "../actions/index"

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/todos" render={routeProps => <TodosList todos={this.props.todos} {...routeProps}/>}/>  
            <Route exact path="/todos/new" render={routeProps => <TodoForm {...routeProps} addTodo={this.props.addTodo} />}/>
            <Route path="/todos/:todoId" render={routeProps => {
              const todo = this.props.todos.find(todo => String(todo.id) === routeProps.match.params.todoId)
              return (!!todo) ? (
                 <TodoItem {...routeProps} {...todo} removeTodo={this.props.removeTodo} />
              ) : (
                <ErrorPage />
              )
            }}/>
            {}
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

// const mapDispatch = (dispatch) => {
//   return {
//     addTodo: (todo) => dispatch(addTodo(todo)),
//     removeTodo: (todoId) => dispatch(removeTodo(todoId)),
//   }
// }

// const mergeProps = (stateProp, dispatchProp, ownProp) => {
//   return {}

// }

export default connect(mapStateToProps, {addTodo, removeTodo})(App);