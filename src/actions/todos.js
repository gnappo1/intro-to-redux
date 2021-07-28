import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE, FETCH_TODOS, DATABASE_INSPECTING, LOADING_DATA, DATABASE_SAVING, ERROR} from "./actionTypes"

export function addTodo(todo){
    return (dispatch) => {
        const configObj = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        }
        dispatch({type: DATABASE_SAVING, payload: true})
        fetch("http://localhost:3000/todos", configObj)
        .then(resp => resp.json())
        .then(json => dispatch({type: ADD_TODO, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function fetchTodos(todos){
    return (dispatch, getState) => {
        dispatch({type: LOADING_DATA})
        fetch("http://localhost:3000/todos")
        .then(resp => resp.json())
        .then(json => dispatch({type: FETCH_TODOS, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function removeTodo(todoId){
    return (dispatch) => {
        const configObj = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            }
        }
        dispatch({type: DATABASE_INSPECTING, payload: true})
        fetch(`http://localhost:3000/todos/${todoId}`, configObj)
        .then(resp => resp.json())
        .then(successMessage => dispatch({type: REMOVE_TODO, payload: todoId}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

export function markComplete(todoId, completionTime){
    return (dispatch, getState) => {
        const todo = getState().todos.todos.find(todo => todo.id === todoId)
        const todoObj = {
            title: todo.title,
            body: todo.body,
            completed: true,
            completion_time: completionTime,
            id: todoId
        }
        const configObj = {
            method: "PATCH",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todoObj)
        }
        dispatch({type: DATABASE_INSPECTING, payload: true})
        fetch(`http://localhost:3000/todos/${todoId}`, configObj)
        .then(resp => resp.json())
        .then(json => dispatch({type: MARK_COMPLETE, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}