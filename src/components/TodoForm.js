import React, { useState, useEffect, useRef } from 'react'

const TodoForm = (props) => {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })

        setInput('');
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {
                props.edit ? (
                    <>
                        <input
                            text="text"
                            placeholder="Update your item"
                            value={input}
                            name="text"
                            className="todo-input edit"
                            onChange={handleChange}
                        />
                        <button className="todo-button edit">Update</button>
                    </>
                ) : (
                    <>
                        <input
                            text="text"
                            placeholder="Add a Todo"
                            value={input}
                            name="text"
                            className="todo-input"
                            onChange={handleChange}
                        />
                        <button className="todo-button">Add todo</button>
                    </>
                )
            }
        </form>
    )
}

export default TodoForm
