import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { formatRelativeTime } from '../utils/dateUtils';

const Todo = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDueDate = (date) => {
    if (!date) return null;
    const dueDate = new Date(date);
    const now = new Date();
    const isOverdue = dueDate < now && !todo.completed;
    
    return {
      formatted: dueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isOverdue
    };
  };

  const dueInfo = todo.dueDate ? formatDueDate(todo.dueDate) : null;

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isHovered ? 'scale-102 -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-between p-4 mb-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
          todo.completed
            ? 'bg-green-50 border-l-4 border-green-400'
            : dueInfo?.isOverdue
            ? 'bg-red-50 border-l-4 border-red-400'
            : 'bg-white border-l-4 border-blue-400'
        }`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onToggle(todo._id)}
            className={`p-3 rounded-full transition-all duration-300 ${
              todo.completed
                ? 'bg-green-500 hover:bg-green-600'
                : dueInfo?.isOverdue
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {todo.completed ? (
              <FaCheck className="text-white text-sm" />
            ) : (
              <FaTimes className="text-white text-sm" />
            )}
          </button>
          <div className="flex flex-col">
            <h3
              className={`text-lg font-semibold ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`text-sm mt-1 ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}
              >
                {todo.description}
              </p>
            )}
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <FaClock className="mr-1" />
                <span title={new Date(todo.createdAt).toLocaleString()}>
                  {formatRelativeTime(todo.createdAt)}
                </span>
              </div>
              {dueInfo && (
                <div className={`flex items-center text-xs ${
                  dueInfo.isOverdue && !todo.completed
                    ? 'text-red-500 font-medium'
                    : 'text-gray-500'
                }`}>
                  <FaCalendarAlt className="mr-1" />
                  <span title={new Date(todo.dueDate).toLocaleString()}>
                    Due {dueInfo.formatted}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`flex space-x-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-300"
          >
            <FaEdit className="text-lg" />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-300"
          >
            <FaTrash className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo; 