"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'


const AddTodo = () => {
    const [task, setTask] = useState("");
    const { refresh } = useRouter();//refresh is destructured from useRouter
    const inputRef = useRef<HTMLInputElement | null>(null); // ref for the input element


    const handleSubmit = async () => {
        try {
            if (task) {
                const res = await fetch("http://localhost:8000/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: task
                    }),
                });
                refresh();
                if (res.ok) {
                    console.log("Added successfully");
                    // Refresh data or update UI
                } else {
                    console.error("Failed to add todo: ", await res.text());
                }
                setTask(''); // Clear the task
                if (inputRef.current) {
                    inputRef.current.value = ''; // Clear the input field
                }
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <div>
            <form className='w-full flex gap-x-3'>
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className='rounded-full text-black w-full py-3.5 px-5 border focus:outline-secondary'
                    type="text"
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

export default AddTodo;
