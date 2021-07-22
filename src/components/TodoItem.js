import { Link, Redirect } from 'react-router-dom';
import {useMemo} from 'react';

const TodoItem = ({id, title, body, completed, completionTime, history, removeTodo, markComplete}) => {

    const handleClick = () => {
        removeTodo(id)
        history.push("/todos")
    }

    const handleCheck = () => {
        const currentDate = new Date().toISOString().split('T')[0]
        markComplete(id, currentDate)
        history.push("/todos")
    }

    const conditionalTitle = () => history.location.pathname === "/todos" ? <Link to={`/todos/${id}`}><h3>{title}</h3></Link> : <h3>{title}</h3>
    const conditionalButtons = () => history.location.pathname === "/todos" ? <></> : <button className="btn btn-danger" onClick={() => handleClick()}>Delete</button>
    const conditionalCheckBox = () => {
        if (history.location.pathname === `/todos/${id}`) {
            if (!completed) {
                return <span>Mark complete <input type="checkbox" onClick={() => handleCheck()} /></span>
            } else {
                return <h4>Todo item complited on date: {completionTime}</h4>
            }
        }
    }
    
    return (
        <div id={`todo-${id}`}>
            {conditionalTitle()}
            {conditionalCheckBox()}
            <p>{body}</p>
            {conditionalButtons()}
        </div>
    )
}

export default TodoItem;