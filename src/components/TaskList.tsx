import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, deleteTask, updateTask } from '../features/tasks/taskSlice';
import { Button, List, Tag, Space, Typography, Divider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleToggleStatus = (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      dispatch(updateTask({ ...task, status: task.status === 'completed' ? 'in-progress' : 'completed' }));
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Task List</Title>
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={task => {
          const formattedDueDate = dayjs(task.dueDate).format('YYYY-MM-DD'); // Format date to string
          return (
            <>
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    icon={task.status === 'completed' ? <EditOutlined /> : <CheckCircleOutlined />}
                    onClick={() => handleToggleStatus(task.id)}
                  >
                    {task.status === 'completed' ? 'Mark In Progress' : 'Mark Completed'}
                  </Button>,
                  <Button
                    // type="danger"
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={<span style={{ fontWeight: 'bold' }}>{task.title}</span>}
                  description={
                    <div>
                      <p>{task.description}</p>
                      <p><strong>Due Date:</strong> {formattedDueDate}</p>
                      <p><strong>Priority:</strong> {task.priority}</p>
                      <Tag color={task.status === 'completed' ? 'green' : 'blue'}>{task.status}</Tag>
                    </div>
                  }
                />
              </List.Item>
              <Divider />
            </>
          );
        }}
      />
    </div>
  );
};

export default TaskList;
