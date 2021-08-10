import { Link } from 'react-router-dom';
const TodoItem = ({id, title, body, completed, avatar_format, attachment_format, history, removeTodo, completion_time, markComplete}) => {
    
    const handleClick = () => {
        removeTodo(id)
        history.push("/todos")
    }

    const handleCompleteChange = () => {
        const currentDate = new Date().toISOString().split("T")[0]
        markComplete(id, currentDate)
        history.push("/todos")
    }

    const formatAvatar = () => {
        return avatar_format ? avatar_format.url : process.env.PUBLIC_URL + '/logo192.png'
    }

    const conditionalTitle = () => history.location.pathname === "/todos" ? <Link to={`/todos/${id}`}><h3>{title}</h3></Link> : <h3>{title}</h3>
    const conditionalButtons = () => history.location.pathname === "/todos" ? <></> : <button className="btn btn-danger" onClick={() => handleClick()}>Delete</button>
    const conditionalCheckBox = () => {
        if (history.location.pathname === `/todos/${id}`) {
            if (!completed) {
                return <span>Mark complete <input type="checkbox" onClick={handleCompleteChange}/></span>
            } else {
                return <h4>Todo item completed on date: {completion_time}</h4>
            }
        }
    }
    
    return (
        <div id={`todo-${id}`}>
            {conditionalTitle()}
            <img src={formatAvatar()} alt="Todo" />
            {conditionalCheckBox()}
            <p>{body}</p>
            {conditionalButtons()}
        </div>
    )
}

export default TodoItem;