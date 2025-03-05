import React, { useState } from 'react';
import { FaPlus, FaCalendarAlt, FaClock } from 'react-icons/fa';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const dueDatetime = dueDate && dueTime 
      ? new Date(`${dueDate}T${dueTime}`)
      : null;

    onAdd({
      title,
      description,
      dueDate: dueDatetime,
    });
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setIsExpanded(false);
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!isExpanded && e.target.value) setIsExpanded(true);
            }}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done?"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 text-lg placeholder-gray-400"
            required
          />
        </div>
        
        <div className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 min-h-[100px] text-gray-600 placeholder-gray-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
                className="w-full pl-10 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaClock className="text-gray-400" />
              </div>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full pl-10 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        <div className={`flex justify-between items-center transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setTitle('');
              setDescription('');
              setDueDate('');
              setDueTime('');
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FaPlus className="text-sm" />
            <span>Add Todo</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo; 