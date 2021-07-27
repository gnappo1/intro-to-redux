import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE, GET_TODOS, DATABASE_INSPECTING, DATABASE_SAVING, ERROR} from "./actionTypes"

export function getTodos(){
    return (dispatch) => {
        dispatch({type: DATABASE_INSPECTING, payload: true})
        fetch("http://localhost:3000/todos")
        .then(resp => resp.json())
        .then(json => dispatch({type: GET_TODOS, payload: json}))
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}

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