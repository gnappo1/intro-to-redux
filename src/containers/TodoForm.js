import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';
import {Redirect} from 'react-router-dom'

class TodoForm extends PureComponent {
    state = {
        title: "",
        body: "",
        isFormSubmitted: false,
        completed: false
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    pick = (...selectedArgs) => obj =>  selectedArgs.reduce((acc, attr) => ({...acc, [attr]: obj[attr]}), {})

    handleSubmit = (e) => {
        e.preventDefault()
        const id = uuidv4()
        const slicedState = this.pick("title", "body", "completed")(this.state)
        // debugger
        this.props.addTodo({...slicedState, id, completionTime: null})
        this.setState({title: "", body: "", isFormSubmitted: true, completed: false})
    }

    render() {
        if (!!this.state.isFormSubmitted) {
            return <Redirect push to="/todos"/>
        }
        return (
            <div className="container">
            <h3 className="form-title">Create a new todo</h3>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title" className="col-md-4 control-label">Title</label>
                                        <div className="col-md-5">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="body" className="col-md-4 control-label">Todo</label>
                                        <div className="col-md-5">
                                            <textarea
                                                className="form-control"
                                                name="body"
                                                value={this.state.body}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                        <button type="submit" className="btn btn-default">Add</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoForm;