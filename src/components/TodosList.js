import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const TodosList = (props) => {
    
    const renderMissingTodos = () => {
        const missingTodos = props.todos.filter(todo => !todo.completed)
        return missingTodos.map(todo => <TodoItem {...todo} history={props.history} key={todo.id} />)
    }

    const renderCompletedTodos = () => {
        const completedTodos = props.todos.filter(todo => todo.completed)
        return completedTodos.map(todo => <TodoItem {...todo} history={props.history} key={todo.id} />)
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