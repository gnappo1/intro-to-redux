import {ADD_TODO, REMOVE_TODO, MARK_COMPLETE, FETCH_TODOS, DATABASE_INSPECTING, LOADING_DATA, DATABASE_SAVING, ERROR} from "./actionTypes"

const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < timeAllowed) {
        return localStorage.getItem("token");
    }
};

export function addTodo(todo){
    return (dispatch) => {
        const configObj = {
            method: "POST",
            headers: {
                accept: "application/json",
                Authorization: getToken()
            },
            body: todo
        }

        dispatch({type: DATABASE_SAVING, payload: true})
        fetch("http://localhost:3000/todos", configObj)
        .then(resp => {
            if (resp.ok) {
                return resp
                        .json()
                        .then(json => dispatch({type: ADD_TODO, payload: json}))
            } else {
                return resp
                        .json()
                        .then((errors) => {
                            dispatch({type: ERROR, payload: errors})
                            return Promise.reject(errors);
                        });
            }
        })
        .catch(err => dispatch({type: ERROR, payload: err}))  
        
    }
}

export function fetchTodos() {
    return (dispatch) => {
        dispatch({type: LOADING_DATA})
        fetch("http://localhost:3000/todos", {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
        })
        .then(resp => {
            if (resp.ok) {
                return resp
                        .json()
                        .then(json => dispatch({type: FETCH_TODOS, payload: json}))
            } else {
                return resp
                        .json()
                        .then((errors) => {
                            dispatch({type: ERROR, payload: errors})
                            return Promise.reject(errors);
                        });
            }
        })
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
        .then(resp => {
            if (resp.ok) {
                return resp
                        .json()
                        .then(json => dispatch({type: REMOVE_TODO, payload: todoId}))
            } else {
                return resp
                        .json()
                        .then((errors) => {
                            dispatch({type: ERROR, payload: errors})
                            return Promise.reject(errors);
                        });
            }
        })
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
        .then(resp => {
            if (resp.ok) {
                return resp
                        .json()
                        .then(json => dispatch({type: MARK_COMPLETE, payload: json}))
            } else {
                return resp
                        .json()
                        .then((errors) => {
                            dispatch({type: ERROR, payload: errors})
                            return Promise.reject(errors);
                        });
            }
        })
        .catch(err => dispatch({type: ERROR, payload: err}))
    }
}