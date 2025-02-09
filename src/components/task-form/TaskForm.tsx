import React, { useState } from 'react';
import axios from 'axios';

interface TaskFormProps {
    eventId: string; // Event ID for which tasks will be created
    onTaskAdded: () => void; // Callback to refresh tasks
}

const TaskForm: React.FC<TaskFormProps> = ({ eventId, onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            alert('Task title is required');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('jwt'); // Authentication token
            await axios.post(
                `http://localhost:8000/api/events/${eventId}/tasks`,
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Task added successfully!');
            onTaskAdded(); // Refresh task list
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a Task</h3>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
