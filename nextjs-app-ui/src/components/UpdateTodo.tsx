"use client"
import React, { useState } from 'react';
import Wrapper from './Wrapper';

interface Todo {
    id: number;
    content: string;
}

const UpdateTodo = () => {
    const [todoId, setTodoId] = useState<number | null>(null);
    const [todo, setTodo] = useState<Todo | null>(null);

    const getData = async () => {
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/todos/${todoId}`, {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Get : ", res .ok);
            if (!res.ok) {
                throw new Error("failed to fetch data");
            };
            const result = await res.json();
            return result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleFetchTodo = async () => {
        try {
            const todoData = await getData();
            setTodo(todoData);
        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    }

    return (
        <Wrapper>
            <div>
                <label htmlFor="todoIdInput">Enter Todo ID:</label>
                <input
                    id="todoIdInput"
                    type="number"
                    value={todoId || ''}
                    className='p-4 rounded-full text-black'
                    onChange={(e) => setTodoId(parseInt(e.target.value))}
                />
                <button onClick={handleFetchTodo}>Fetch Todo</button>
            </div>  
            <div>
                <h2>Todo Details</h2>
                {todo ? (
                    <div>
                        <p>Todo ID: {todo.id}</p>
                        <p>Content: {todo.content}</p>
                    </div>
                ) : (
                    <p>No todo data fetched</p>
                )}
            </div>
        </Wrapper>
    );
}

export default UpdateTodo;

