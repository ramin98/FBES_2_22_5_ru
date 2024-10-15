import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io("http://localhost:4000");

function ChatWindow({ userId }) {
    const [users, setUsers] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // Получение списка пользователей
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:4000/users');
            setUsers(response.data);
        };

        fetchUsers();

        // Обработка получения сообщения
        socket.on('receiveMessage', (messageData) => {
            setMessages(prevMessages => [...prevMessages, messageData]);
        });

        return () => socket.off('receiveMessage');
    }, []);

    const handleUserSelect = async (receiverId) => {
        console.log(`Selected user ID: ${receiverId}`);
        
        // Создание или получение существующего чата
        try {
            const response = await axios.post('http://localhost:4000/chats', { participants: [userId, receiverId] });
            
            setSelectedChatId(response.data.id);
    
            // Получение сообщений для нового чата
            const messagesResponse = await axios.get(`http://localhost:4000/chats/${response.data.id}/messages`);
            setMessages(messagesResponse.data);
    
            socket.emit('joinChat', response.data.id); // Присоединяемся к новому чату
        } catch (error) {
            console.error("Error creating or fetching chat", error.response ? error.response.data : error.message);
        }
    };

    const sendMessage = () => {
        if (messageInput && selectedChatId) {
            socket.emit('sendMessage', { chatId: selectedChatId, senderId: userId, content: messageInput });
            setMessages(prevMessages => [...prevMessages, { chat_id: selectedChatId, sender_id: userId, content: messageInput }]);
            setMessageInput('');
        }
    };

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => handleUserSelect(user.id)}>
                        {user.username}
                    </li>
                ))}
            </ul>

            {selectedChatId && (
                <div>
                    <h3>Chat with User ID: {selectedChatId}</h3>
                    <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ color: msg.sender_id === userId ? 'blue' : 'black' }}>
                                {msg.content}
                            </div>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        value={messageInput} 
                        onChange={(e) => setMessageInput(e.target.value)} 
                        placeholder="Type your message" 
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
}

export default ChatWindow;