import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

import "./chat.css";

const Chat = () => {
    const location = useLocation();
    const { name, room } = location.state

    const [socket] = useState(io('http://localhost:8080'));
    const [usersInRoom, setUsersInRoom] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.emit('join', { name, room }, (error) => {
            if (error) alert(error);
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [socket, name, room]);

    useEffect(() => {
        socket.on('message', (newMessage) => {
            setMessages([...messages, newMessage]);
        });

    }, [messages, socket])

    useEffect(() => {
        socket.on('roomData', (roomData) => {
            const { users } = roomData;

            setUsersInRoom(users);
        })
    }, [socket, usersInRoom]);

    const handleMessageSubmit = (evt) => {
        evt.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    
    return (
        <div className='outerContainer'>
            <div className='container'>
                <div className="infoBar">
                    <div className="leftInnerContainer">
                        <img src={onlineIcon} className="onlineIcon" alt="onlineImage" />

                        <h3>{room}</h3>
                    </div>

                    <div className="rightInnerContainer">
                        <a href="/"><img src={closeIcon} alt="closeImage" /></a>
                    </div>
                </div>

                <ScrollToBottom className='messages'>
                    {messages.map((message, index) => {
                        const trimmedName = name.trim().toLowerCase();
                        const isSentByCurrentUser = message.user === trimmedName;


                        return (
                            <div key={index}>
                                {isSentByCurrentUser ? (
                                    <div className='messageContainer justify-end'>
                                        <p className='sendText pr-10'>{trimmedName}</p>

                                        <div className='messageBox backgroundBlue'>
                                            <p className='messageText colorWhite'>{message.text}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='messageContainer justifyStart'>
                                        <div className='messageBox backgroundLight'>
                                            <p className='messageText colorDark'>{message.text}</p>
                                        </div>

                                        <p className='sentText pl-10'>{ message.user }</p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </ScrollToBottom>

                <form className='form' onSubmit={handleMessageSubmit}>
                    <input className='input' value={message} onChange={(evt) => setMessage(evt.target.value)} />
                </form>
            </div>
        </div>
    )
}

export default Chat