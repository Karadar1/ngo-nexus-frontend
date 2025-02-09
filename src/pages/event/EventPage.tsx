import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BackButton, Container, Section, Tag, TagsContainer, Title } from './EventPage.styled';
import TaskComponent from '../../components/task/Task'; // Import TaskComponent
import { TaskContainer } from '../../components/task/Task.styled'; // Import TaskContainer
import MiniNavbar from '../../components/event-navbar/EventNavbar';
import { Event } from '../../types/Event';
// Interface for Event


interface Task {
    title: string;
    description: string;
    status: string;
    assignedTo?: string;
}

const TaskForm = styled.form`
    margin: 20px 0;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Textarea = styled.textarea`
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
`;

const ToggleButton = styled(Button)`
    background-color: #28a745;

    &:hover {
        background-color: #218838;
    }
`;

const EventPage: React.FC = () => {
    const { id } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState<Event | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [userId, setUserId] = useState<string | null>(null); // Logged-in user's ID
    const [showTaskForm, setShowTaskForm] = useState(false); // Toggle for task form
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:8000/api/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if(token){
                    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get user ID
                    setUserId(decodedToken.id); // Set the logged-in user's ID
                }
                setEvent(response.data);
                setTasks(response.data.tasks);
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Failed to fetch event details. Please try again later.');
            }
        };

        fetchEvent();
    }, [id]);

    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newTask.title) {
            alert('Task title is required.');
            return;
        }

        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                `http://localhost:8000/api/events/${id}/tasks`,
                newTask,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prev) => [...prev, response.data.task]);
            setNewTask({ title: '', description: '' });
            setShowTaskForm(false); // Hide the form after submission
        } catch (err) {
            console.error('Error creating task:', err);
            alert('Failed to create task. Please try again later.');
        }
    };

    const handleEditTask = (taskIndex: number) => {
        console.log('Editing task:', tasks[taskIndex]);
        // Add editing logic here
    };

    const handleDeleteTask = (taskIndex: number) => {
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks);
        // Add deletion logic to backend if required
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!event) {
        return <p>Loading event details...</p>;
    }

    const isEventOwner = userId === event.createdBy.id; // Check if the logged-in user owns the event

    return (
        <Container>
            <MiniNavbar />
            <Title>{event.title}</Title>
            <Section>
                <span>Description:</span> {event.description}
            </Section>
            <Section>
                <span>Location:</span> {event.location}
            </Section>
            <Section>
                <span>Date:</span> {new Date(event.date).toLocaleDateString()}
            </Section>
            <Section>
                <span>Status:</span> {event.status}
            </Section>
            <Section>
                <span>Created By:</span> {event.createdBy.name} ({event.createdBy.role})
            </Section>
            <TagsContainer>
                {event.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </TagsContainer>

            {/* Toggle Button for Task Form */}
            {isEventOwner && (
                <ToggleButton onClick={() => setShowTaskForm((prev) => !prev)}>
                    {showTaskForm ? 'Cancel' : 'Create Task'}
                </ToggleButton>
            )}

            {/* Task Form (Visible only when toggled) */}
            {isEventOwner && showTaskForm && (
                <TaskForm onSubmit={handleTaskSubmit}>
                    <h3>Create Task</h3>
                    <Input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <Textarea
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <Button type="submit">Create Task</Button>
                </TaskForm>
            )}

            {/* Task List */}
            <TaskContainer>
                <h3>Tasks</h3>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <TaskComponent
                        key={index}
                        task={task}
                        onEdit={isEventOwner ? () => handleEditTask(index) : undefined}
                        onDelete={isEventOwner ? () => handleDeleteTask(index) : undefined}
                        isEventOwner={isEventOwner} // Pass the new prop
                    />
                    ))
                ) : (
                    <p>No tasks available for this event.</p>
                )}
            </TaskContainer>

            <BackButton onClick={() => window.history.back()}>Back</BackButton>
        </Container>
    );
};

export default EventPage;
