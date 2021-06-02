import React, { useState, useEffect } from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        getLocalTodos()
    }, []);

    useEffect(() => {
        saveLocalTodos();
    }, [todos])

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(todo, ...todos);
    }

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]));
        } else {
            let todoLocal = JSON.parse(localStorage.getItem("todos"));
            setTodos(todoLocal);
        }
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id != id)

        setTodos(removeArr);
    }



    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })

        setTodos(updatedTodos);
    }

    return (
        <div>
            <h1>What is your Play?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    )
}

export default TodoList
