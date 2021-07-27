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
import {addTodo, removeTodo, markComplete, fetchTodos} from "../actions/index"

class App extends Component {

  componentDidMount() {
    this.props.fetchTodos()
  }

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
                 <TodoItem {...routeProps} {...todo} markComplete={this.props.markComplete} removeTodo={this.props.removeTodo} />
              ) : (
                <ErrorPage />
              )
            }}/>
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (currentState) => {
  return {
    todos: currentState.todos.todos
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     addTodo: (todo) => dispatch(addTodo(todo)),
//     removeTodo: (todoId) => dispatch(removeTodo(todoId)),
//      fetchTodos: (todos) => dispatch(fetchTodos(todos))
//   }
// }

// const mergeProps = (stateProp, dispatchProp, ownProp) => {
//   return {}

// }

export default connect(mapStateToProps, {addTodo, removeTodo, markComplete, fetchTodos})(App);