"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wrapper from './Wrapper';

interface Todo {
    id: number;
    content: string;
}

// const TodoList: React.FC = () => {
//     const [todos, setTodos] = useState<Todo[]>([]);

//     useEffect(() => {
//         const fetchTodos = async () => {
//             try {
//                 const response = await axios.get<Todo[]>(`${process.env.API_BASE_URL}/todos/`);
//                 setTodos(response.data);
//                 console.log(response)
//             } catch (error) {
//                 console.error('Error fetching todos:', error);
//             }
//         };

//         fetchTodos();
//     }, []);
// console.log("Todos : ",todos)
//     return (
//         <div>
//             <h2>Todo List</h2>
//             <ul>
//                 {todos.map(todo => (
//                     <li className='text-white'
//                         key={todo.id}>
//                         Todo ID: {todo.id},
//                         Content: {todo.content}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default TodoList;


const getData = async () => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/todos/`,
            {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        console.log("Get : ",res.ok);
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

const TodoList = async () => {

    const res: Todo[] = await getData();
    console.log(res);

    return (
        <Wrapper>
            <div className="max-h-[350px] overflow-auto mb-4">
                {
                    res.map((item) => {
                        return (
                            <div key={item.id} className="bg-gray-800 px-4 py-4 flex items-center gap-x-3 shadow rounded-lg my-5">
                                {/* circle */}
                                <div className="bg-gray-800 rounded-full justify-between items-center h-3 w-3"></div>
                                {/* Text Title*/}
                                <p className="text-lg font-medium"><span className='font-semibold text-xl'>Id : </span>{item.id}</p>
                                <p className="text-lg font-medium">{item.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </Wrapper>
    )
}

export default TodoList
