import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const TodosList = (props) => {

    const renderOpenTodos = () => {
        const openTodos = props.todos.filter(todo => !todo.completed)
        return openTodos.map(todo => <TodoItem {...todo} history={props.history} key={todo.id} />)
    }
    
    const renderCompletedTodos = () => {
        const filteredTodos = props.todos.filter(todo => !!todo.completed)
        return filteredTodos.map(todo => <TodoItem {...todo} history={props.history} key={todo.id} />)
    }

    return (
        <>
            <h1>Pending Todos</h1>
            {renderOpenTodos()}
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