import React from 'react';
import Todo from './Todo';
import { FaClipboardList, FaCalendarAlt, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { groupTodosByDate } from '../utils/dateUtils';

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  if (!todos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-md">
        <FaClipboardList className="text-6xl text-gray-300 mb-4" />
        <p className="text-xl text-gray-500 font-medium">No todos yet.</p>
        <p className="text-gray-400 mt-2">Add one to get started!</p>
      </div>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  // Sort pending todos by due date
  const sortedPendingTodos = [...pendingTodos].sort((a, b) => {
    // Put todos without due dates at the end
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  // Group pending todos by deadline status
  const now = new Date();
  const overdueItems = sortedPendingTodos.filter(todo => 
    todo.dueDate && new Date(todo.dueDate) < now
  );
  const dueTodayItems = sortedPendingTodos.filter(todo => {
    if (!todo.dueDate) return false;
    const dueDate = new Date(todo.dueDate);
    return dueDate.toDateString() === now.toDateString();
  });
  const upcomingItems = sortedPendingTodos.filter(todo => 
    todo.dueDate && new Date(todo.dueDate) > now && 
    new Date(todo.dueDate).toDateString() !== now.toDateString()
  );
  const noDueDateItems = sortedPendingTodos.filter(todo => !todo.dueDate);

  // Group completed todos by date
  const groupedCompletedTodos = groupTodosByDate(completedTodos);

  const renderTodoSection = (title, items, icon, colorClass) => {
    if (!items.length) return null;
    return (
      <div className="mb-8 last:mb-0">
        <h3 className={`text-lg font-medium mb-4 flex items-center ${colorClass}`}>
          {icon}
          <span className="ml-2">{title}</span>
          <span className="ml-2 bg-gray-100 px-2 py-1 rounded-full text-sm">
            {items.length}
          </span>
        </h3>
        <div className="space-y-2">
          {items.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCompletedSection = (groupedTodos) => {
    return groupedTodos.map(({ date, todos: dateTodos }) => (
      <div key={date} className="mb-8 last:mb-0">
        <h3 className="text-md font-medium text-gray-600 mb-4 flex items-center">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
          <span className="ml-2 bg-gray-100 px-2 py-1 rounded-full text-sm">
            {dateTodos.length}
          </span>
        </h3>
        <div className="space-y-2">
          {dateTodos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-8">
      {pendingTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">
              {pendingTodos.length}
            </span>
            Pending Tasks
          </h2>
          {renderTodoSection(
            'Overdue',
            overdueItems,
            <FaExclamationCircle className="text-red-500" />,
            'text-red-500'
          )}
          {renderTodoSection(
            'Due Today',
            dueTodayItems,
            <FaCalendarAlt className="text-orange-500" />,
            'text-orange-500'
          )}
          {renderTodoSection(
            'Upcoming',
            upcomingItems,
            <FaCalendarAlt className="text-blue-500" />,
            'text-blue-500'
          )}
          {renderTodoSection(
            'No Due Date',
            noDueDateItems,
            <FaCalendarAlt className="text-gray-400" />,
            'text-gray-500'
          )}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center text-sm mr-2">
              {completedTodos.length}
            </span>
            Completed Tasks
          </h2>
          {renderCompletedSection(groupedCompletedTodos)}
        </div>
      )}
    </div>
  );
};

export default TodoList; 