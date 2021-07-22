import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TodosList from "../components/TodosList"
import TodoItem from "../components/TodoItem"
import Navbar from "../components/Navbar"
import Home from "../components/Home"
import ErrorPage from "../components/ErrorPage"
import TodoForm from "./TodoForm"
import {connect, useSelector} from "react-redux"
import {addTodo, removeTodo, markComplete} from "../actions/index"

class App extends Component {

  // const todos = useSelector(() => {todos: currenState.todos})

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/todos" render={routeProps => <TodosList todos={this.props.todos} {...routeProps}/>}/>  
            <Route exact path="/todos/new" render={routeProps => <TodoForm addTodo={this.props.addTodo} {...routeProps}/>}/>  
            <Route path="/todos/:todoId" render={routeProps => {
              const todo = this.props.todos.find(todo => String(todo.id) === routeProps.match.params.todoId)
              return todo ? <TodoItem {...routeProps} removeTodo={this.props.removeTodo} markComplete={this.props.markComplete} {...todo} /> : <ErrorPage />
            }}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapState = (currenState) => {
  return {todos: currenState.todos}
}

// const mapDispatch = (dispatch) => {
//   return {
//     addTodo: (todo) => dispatch(addTodo(todo)),
//     removeTodo: (todoId) => dispatch(removeTodo(todoId)),
//     markComplete: (todoId, completionTime) => dispatch(markComplete(todoId, completionTime)),
//   }
// }

// const mergeProps = (stateProps, dispatchProps, ownProps) => {
//   {}// do something with all these props here!}
// }

export default connect(mapState, {addTodo, removeTodo, markComplete})(App);
