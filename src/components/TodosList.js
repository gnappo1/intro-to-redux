import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const TodosList = (props) => {
    
    const renderTodos = () => {
        return props.todos.map(todo => <TodoItem {...todo} history={props.history} key={todo.id} />)
    }

    const renderCompletedTodos = () => {

    }

    return (
        <>
            <h1>Pending Todos</h1>
            {renderTodos()}
            <h3>Completed Todos</h3>
            {renderCompletedTodos()}
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