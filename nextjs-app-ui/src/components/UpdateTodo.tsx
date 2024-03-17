"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const UpdateTodo: React.FC = () => {
    const [updatedTask, setUpdatedTask] = useState("");
    const [todoId, setTodoId] = useState<number | null>(null); // Optionally manage the todo ID state
    const { refresh } = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null); // ref for the input 

    const apiUrl = "http://localhost:8000";
    const todoUrl = apiUrl + "/todos/" + todoId;

    const handleSubmit = async () => {
        try {
            if (!todoId) {
                console.error("No todo ID provided");
                return;
            }

            const res = await fetch(todoUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: updatedTask
                }),
            });
            if (res.ok) {
                console.log("Todo updated successfully");
            } else {
                console.error("Failed to update todo: ", await res.text());
            }
            refresh();
            setTodoId(null)
            setUpdatedTask('')
            if (inputRef.current) {
                inputRef.current.value = ''; // Clear the input field
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div>
            <form className='w-full flex gap-x-3'>
                <input
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                    className='rounded-full text-black w-full py-3.5 px-5 border focus:outline-secondary'
                    type="text"
                    placeholder='Updated Todo'
                />
                {/* Optionally, you can have an input for todo ID */}
                <input
                    value={todoId ?? ''}
                    onChange={(e) => setTodoId(parseInt(e.target.value))}
                    className='rounded-full text-black w-full py-3.5 px-5 border focus:outline-secondary'
                    type="number"
                    placeholder='ID to Update'
                />
                <button
                    type='button'
                    onClick={() => {
                        handleSubmit();
                        if (inputRef.current) {
                            inputRef.current.value = ''; // Clear the input field after clicking the button
                        }
                    }}
                    className='p-4 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary'>
                    <span className='text-white font-bold text-4xl'>+</span>
                </button>
            </form>
        </div >
    );
};

export default UpdateTodo;
