import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const TodosList = (props) => {
    
    const renderTodos = () => {
        return props.todos.map(todo => <TodoItem {...todo} key={todo.id} />)
    }
    return (
        <>
            <h1>Todos</h1>
            {renderTodos()}
        </>
    )
}

TodosList.propTypes = {
    todos: PropTypes.array
}

TodosList.defaultProps = {
    todos: []
}

export default TodosList;