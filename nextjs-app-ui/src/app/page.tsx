import AddTodo from '@/components/AddTodo';
import TodoList from '../components/TodoList';
import UpdateTodo from '@/components/UpdateTodo';
import DeleteTodo from '@/components/DeleteTodo';

export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-primary to-secondary h-screen
    flex justify-center items-center">
      <div className="rounded-xl px-3 py-4 bg-gradient-to-br from-[#D9D9D9]/70 to-[#D9D9D9]/60 
      backdrop-blur-xl bg-opacity-50 w-full max-w-md">
        
        {/* TodoList */}
        <h2 className='font-bold text-3xl text-center text-gray-800'>Read Todos</h2>
        <TodoList />
        
        {/* AddTodo  */}
        <h2 className='font-bold text-3xl text-center text-gray-800'>Create Todo</h2>
        <AddTodo />
        {/* Bar */}
        <div className="h-1.5 bg-black mx-auto rounded-md w-1/2 mt-6"></div>
        
        {/* Delete Todo */}
        <h2 className='font-bold text-3xl text-center text-gray-800'>Delete Todo</h2>
        <DeleteTodo />
        {/* Bar */}
        <div className="h-1.5 bg-black mx-auto rounded-md w-1/2 mt-6"></div>

        {/* Update Todo */}
        <h2 className='font-bold text-3xl text-center text-gray-800'>Update Todo</h2>
        <UpdateTodo />
        {/* Bar */}
        <div className="h-1.5 bg-black mx-auto rounded-md w-1/2 mt-6"></div>
      </div>
    </main>
  )
}