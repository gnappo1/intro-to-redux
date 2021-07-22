import { Link } from 'react-router-dom';
const TodoItem = ({id, title, body, removeTodo, history}) => {

    const handleDelete = () => {
        removeTodo(id)
        history.push("/todos")
    }

    const conditionalTitle = () => history.location.pathname === "/todos" ? <></> : <button onClick={handleDelete}>Delete</button>
    
    return (
        <div id={`todo-${id}`}>
            <Link to={`/todos/${id}`}><h3>{title}</h3></Link>
            <p>{body}</p>
            {conditionalTitle()}
        </div>
    )
}

export default TodoItem;