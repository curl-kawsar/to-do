'use client';
import { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          router.push('/login');
        } else {
          fetchTodos();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch todos');
      }
      
      const data = await response.json();
      setTodos(data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add todo');
      }

      const data = await response.json();
      setTodos([...todos, data]);
      setError('');
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete todo');
      }

      setTodos(todos.filter((todo) => todo._id !== id));
      setError('');
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update todo');
      }

      setTodos(
        todos.map((t) =>
          t._id === id ? { ...t, completed: !t.completed } : t
        )
      );
      setError('');
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleEditTodo = async (todo) => {
    // Implementation for editing todo will go here
    console.log('Edit todo:', todo);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center space-y-4">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
          <p className="text-gray-600">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            My Todo List
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Organize your tasks and boost your productivity
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="grid gap-8">
          <AddTodo onAdd={handleAddTodo} />
          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
            onEdit={handleEditTodo}
          />
        </div>
      </div>
    </div>
  );
}
