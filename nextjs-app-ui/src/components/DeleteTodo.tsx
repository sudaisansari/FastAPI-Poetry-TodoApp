"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'

const DeleteTodo = () => {
    const [todoId, setTodoId] = useState<number | null>(null);
    const { refresh } = useRouter();//refresh is destructured from useRouter
    const inputRef = useRef<HTMLInputElement | null>(null); // ref for the input 

    const apiUrl = "http://localhost:8000";
    const todoUrl = apiUrl + "/todos/" + todoId;

    const deleteTodo = async () => {
        try {
            console.log("Delete Method Called");
            const res = await fetch(todoUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            refresh();
            console.log("Delete : ", res.ok);
            if (res.ok) {
                console.log("Deleted successfully");
                // Refresh data or update UI
            } else {
                console.error("Failed to Delete todo ");
            }
            setTodoId(null);
            if (inputRef.current) {
                inputRef.current.value = ''; // Clear the input field
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    return (
        <div>
            <form className='w-full flex gap-x-3'>
                <input
                    value={todoId || ''}
                    id="todoIdInput"
                    type="number"
                    onChange={(e) => setTodoId(parseInt(e.target.value))}
                    className='rounded-full text-black w-full py-3.5 px-5 border focus:outline-secondary'
                />
                <button
                    type='button'
                    onClick={() => {
                        deleteTodo();
                        if (inputRef.current) {
                            inputRef.current.value = ''; // Clear the input field after clicking the button
                        }
                    }}
                    className='p-4 shrink-0 rounded-full bg-gradient-to-b from-primary to-secondary'>
                    <span className='text-white font-bold text-4xl'>-</span>
                </button>
            </form>
        </div>
    );
}
export default DeleteTodo;

