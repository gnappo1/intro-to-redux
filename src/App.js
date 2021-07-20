import './App.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TodosList from "./TodosList"
import TodoItem from "./TodoItem"
import Navbar from "./Navbar"
import Home from "./Home"

class App extends Component {

  state = {
    todos: [
        {title: "Clean Dishes", body: "Finish cleaning dishes by 7pm ET", id: 1},
        {title: "Clean Floors", body: "Finish cleaning floors by 7pm ET", id: 2},
        {title: "Clean Curtains", body: "Finish cleaning curtains by 7pm ET", id: 3}
    ]
  }

  render() {

    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route exact path="/todos" render={routeProps => <TodosList todos={this.state.todos} {...routeProps}/>}/>  
            <Route path="/todos/:todoId" render={routeProps => {
              const todo = this.state.todos.find(todo => todo.id === parseInt(routeProps.match.params.todoId))
              return <TodoItem {...routeProps} {...todo} />
            }}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
