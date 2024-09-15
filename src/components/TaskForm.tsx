import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/taskSlice';
import { Input, Button, DatePicker, Select, Form } from 'antd';
import { CalendarOutlined, ExclamationCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Moment } from 'moment';
import './TaskForm.css'; // Import custom CSS if needed
import image from "../images/formbgimage.jpg"
const { Option } = Select;

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  status: 'in-progress' | 'completed';
}

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [priority, setPriority] = useState<number>(1);
  const [status, setStatus] = useState<'in-progress' | 'completed'>('in-progress');

  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    const newTask: Task = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      dueDate: values.dueDate || '',
      priority: values.priority,
      status: values.status,
    };
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setDueDate(null);
    setPriority(1);
    setStatus('in-progress');
  };

  const handleDateChange = (date: Moment | null) => {
    setDueDate(date ? date.format('YYYY-MM-DD') : null);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 relative">
      <img src={image}  alt="Decorative background" className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg" />
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <AppstoreAddOutlined className="text-blue-500 text-3xl mr-3" />
          Add New Task
        </h2>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ priority: 1, status: 'in-progress' }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the task title!' }]}
          >
            <Input
              prefix={<ExclamationCircleOutlined />}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md"
              placeholder="Enter task title"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md"
              placeholder="Enter task description"
            />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-md"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Please select a priority level!' }]}
          >
            <Select
              value={priority}
              onChange={(value) => setPriority(value)}
              className="w-full border border-gray-300 rounded-md"
            >
              <Option value={1}>Low</Option>
              <Option value={2}>Medium</Option>
              <Option value={3}>High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              className="w-full border border-gray-300 rounded-md"
            >
              <Option value="completed">Completed</Option>
              <Option value="in-progress">In Progress</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
