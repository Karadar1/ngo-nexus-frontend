import styled from "styled-components";

export const CardContainer = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const Title = styled.h3`
    font-size: 1.5rem;
    color: #0077cc;
    margin-bottom: 8px;
`;

export const Description = styled.p`
    font-size: 1rem;
    color: #555;
    margin-bottom: 8px;
`;

export const Location = styled.p`
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 8px;
`;

export const DateElement = styled.p`
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 8px;
`;

export const Tags = styled.div`
    margin-bottom: 12px;

    span {
        background-color: #f1f1f1;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 0.8rem;
        margin-right: 4px;
        color: #555;
    }
`;

export const ParticipateButton = styled.button`
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #005fa3;
    }
`;
