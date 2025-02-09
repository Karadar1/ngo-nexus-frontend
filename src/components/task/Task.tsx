import React from 'react';
import {
    TaskCard,
    TaskTitle,
    TaskDescription,
    TaskStatus,
    TaskActions,
} from './Task.styled';

interface Task {
    title: string;
    description: string;
    status: string;
    assignedTo?: string;
}

interface TaskComponentProps {
    task: Task;
    onEdit?: () => void;
    onDelete?: () => void;
    isEventOwner: boolean; // New prop to determine if user is event owner
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, onEdit, onDelete, isEventOwner }) => {
    return (
        <TaskCard>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>
                {task.description || 'No description provided.'}
            </TaskDescription>
            <TaskStatus status={task.status}>
                Status: {task.status}
            </TaskStatus>
            {isEventOwner && ( // Only show actions if user is event owner
                <TaskActions>
                    {onEdit && (
                        <button className="edit-btn" onClick={onEdit}>
                            Edit
                        </button>
                    )}
                    {onDelete && (
                        <button className="delete-btn" onClick={onDelete}>
                            Delete
                        </button>
                    )}
                </TaskActions>
            )}
        </TaskCard>
    );
};

export default TaskComponent;
