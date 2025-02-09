import styled from 'styled-components';

interface TaskStatusProps {
    status: string;
}

export const TaskContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const TaskCard = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    }

    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TaskTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: #333;
`;

export const TaskDescription = styled.p`
    font-size: 1rem;
    color: #555;
    line-height: 1.5;
`;

export const TaskStatus = styled.div<TaskStatusProps>`
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: capitalize;
    color: ${(props) =>
        props.status === 'completed'
            ? '#28a745'
            : props.status === 'in progress'
            ? '#ffc107'
            : '#dc3545'};
`;

export const TaskActions = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;

    button {
        padding: 8px 15px;
        border: none;
        border-radius: 5px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;

        &:hover {
            transform: translateY(-2px);
        }
    }

    .edit-btn {
        background-color: #007bff;
        color: white;

        &:hover {
            background-color: #0056b3;
        }
    }

    .delete-btn {
        background-color: #dc3545;
        color: white;

        &:hover {
            background-color: #a71d2a;
        }
    }
`;