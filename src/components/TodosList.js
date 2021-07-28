import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const TodosList = ({todos, history}) => {

    const renderMissingTodos = () => {
        const missingTodos = todos.filter(todo => !todo.completed)
        return missingTodos.map(todo => <TodoItem {...todo} history={history} key={todo.id} />)
    }

    const renderCompletedTodos = () => {
        const completedTodos = todos.filter(todo => todo.completed)
        return completedTodos.map(todo => <TodoItem {...todo} history={history} key={todo.id} />)
    }

    return (
        <>
            <h1>Pending Todos</h1>
            {renderMissingTodos()}
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