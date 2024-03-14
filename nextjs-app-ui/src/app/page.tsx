import AddTodo from '@/components/AddTodo';
import TodoList from '../components/TodoList';
import UpdateTodo from '@/components/UpdateTodo';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Next.js Todo App</h1>
        <TodoList />
        {/* <AddTodo /> */}
        <UpdateTodo />
      </div>
    </main>
  )
}