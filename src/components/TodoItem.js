import { Link } from 'react-router-dom';
const TodoItem = ({id, title, body, completed, history, removeTodo}) => {

    const handleClick = () => {
        removeTodo(id)
        history.push("/todos")
    }

    const conditionalTitle = () => history.location.pathname === "/todos" ? <Link to={`/todos/${id}`}><h3>{title}</h3></Link> : <h3>{title}</h3>
    const conditionalButtons = () => history.location.pathname === "/todos" ? <></> : <button className="btn btn-danger" onClick={() => handleClick()}>Delete</button>
    const conditionalCheckBox = () => {
        if (history.location.pathname === `/todos/${id}`) {
            if (!completed) {
                return <span>Mark complete <input type="checkbox" /></span>
            } else {
                return <h4>Todo item complited on date: {}</h4>
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