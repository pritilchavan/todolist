import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'antd/dist/reset.css'; // Import Ant Design styles
import './index.css'; // Import Tailwind CSS
import image from "./images/notepad-pen-with-words-from-todo-list-multicolored-background.webp"

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">React Task</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
