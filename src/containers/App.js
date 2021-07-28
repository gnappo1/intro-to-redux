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
import LoadingIndicator from '../components/LoadingIndicator';
import {fetchTodos, addTodo, removeTodo, markComplete} from "../actions/index"

class App extends Component {

  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    if (!!this.props.loading) {
      return <LoadingIndicator/>
    }

    if (!!this.props.error) {
      return <ErrorPage error={this.props.error} />
    }

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
    todos: currentState.todos.todos,
    loading: currentState.todos.loading,
    error: currentState.todos.error
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    removeTodo: (todoId) => dispatch(removeTodo(todoId)),
    markComplete: (todoId, completionTime) => dispatch(markComplete(todoId, completionTime)),
    fetchTodos: (todos) => dispatch(fetchTodos(todos))
  }
}

// const mergeProps = (stateProp, dispatchProp, ownProp) => {
//   return {}

// }

export default connect(mapStateToProps, mapDispatch)(App);
