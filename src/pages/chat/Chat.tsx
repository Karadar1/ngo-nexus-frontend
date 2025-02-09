import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import {
    ChatContainer,
    Input,
    InputContainer,
    MessageBubble,
    MessagesContainer,
    SendButton,
    MessageWrapper,
} from "./Chat.styled";
import { useUser } from "../../context/UserContext";

interface Message {
    sender: {
        id: string;
        name: string;
    };
    message: string;
    timestamp: string;
}

// Ensure the WebSocket is initialized only once
const socket = io("http://localhost:8000");

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]); // Ensure messages is an array
    const [newMessage, setNewMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();
    const { id } = useParams();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        // Fetch chat messages when the component loads
        const fetchChatMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/events/${id}/chat`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data)
                // Ensure we get an array before setting state
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setMessages([]); // Prevent errors if API returns non-array data
                }
                setLoading(false);
            } catch (error) {
                console.error("❌ Error fetching chat:", error);
                setError("Failed to load messages. Please try again.");
                setMessages([]); // Ensure messages is always an array
                setLoading(false);
            }
        };

        fetchChatMessages();

        // Join the WebSocket room
        socket.emit("joinRoom", id);

        // Listen for new messages
        socket.on("newMessage", (message: Message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("newMessage"); // Cleanup WebSocket listener
        };
    }, [id]); // Re-run when the event ID changes

    const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newMessage.trim()) return;

        const token = localStorage.getItem("jwt");

        try {
            const response = await axios.post(
                `http://localhost:8000/api/events/${id}/chat`,
                { message: newMessage },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Emit message via WebSocket
            socket.emit("sendMessage", {
                eventId: id,
                sender: { id: user?.id, name: user?.name },
                message: newMessage,
            });

            setNewMessage(""); // Clear input field
        } catch (error) {
            console.error("❌ Error sending message:", error);
            setError("Failed to send message. Try again.");
        }
    };

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <ChatContainer>
            <MessagesContainer>
                {loading ? (
                    <p>Loading messages...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <MessageWrapper key={index} isUser={user?.id === msg.sender.id}>
                            <MessageBubble isUser={user?.id === msg.sender.id}>
                                <strong>{msg.sender.name}:</strong> {msg.message}
                            </MessageBubble>
                        </MessageWrapper>
                    ))
                ) : (
                    <p>No messages yet. Start the conversation!</p>
                )}
                <div ref={messagesEndRef} /> {/* Auto-scroll reference */}
            </MessagesContainer>

            <InputContainer onSubmit={sendMessage}>
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    aria-label="Type a message"
                />
                <SendButton type="submit" disabled={!newMessage.trim()} aria-label="Send message">
                    Send
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default Chat;
