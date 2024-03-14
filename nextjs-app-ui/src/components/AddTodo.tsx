"use client"
import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface NewTodo {
    content: string;
}
const AddTodo = async () => {
    const [content, setContent] = useState<string>(""); // Change the type to string
    const { refresh } = useRouter();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleAddTodo = () => {
        if (content) {
            fetch(`${process.env.API_BASE_URL}/todos`, {
                method: "POST",
                body: JSON.stringify({
                    content: content
                }),
            })
                .then(res => {
                    console.log("response : ", res.ok);
                    refresh();
                    setContent("");
                })
                .catch(error => {
                    console.error("Error adding todo:", error);
                });
        }
    };


    return (
        <div>
            <form className='w-full flex gap-x-3 flex-col'>
                <input
                    type="text"
                    value={content} // Use value instead of onChange
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter todo content..."
                    className='rounded-full w-full py-3.5 px-5 border focus:outline-secondary text-teal-950'
                />
                <button
                    type='button'
                    onClick={() => {
                        console.log("clicked");
                        handleAddTodo();
                        if (inputRef.current) {
                            inputRef.current.value = '';
                        }
                    }}
                    className='p-4 shrink-0 rounded-full bg-red-500 hover:bg-green-400'
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
};


export default AddTodo;