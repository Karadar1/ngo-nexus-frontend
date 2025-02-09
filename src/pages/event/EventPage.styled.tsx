import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
`;

export const Section = styled.div`
    margin-bottom: 10px;
    font-size: 1rem;
    color: #555;

    span {
        font-weight: bold;
    }
`;

export const TagsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

export const Tag = styled.span`
    background: #007bff;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
`;

export const BackButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #0056b3;
    }
`;