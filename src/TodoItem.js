import { Link } from 'react-router-dom';
const TodoItem = ({id, title, body}) => {
    return (
        <div id={`todo-${id}`}>
            <Link to={`/todos/${id}`}><h3>{title}</h3></Link>
            <p>{body}</p>
        </div>
    )
}

export default TodoItem;