import React, { useState, useEffect, useContext } from 'react';
import { io } from "socket.io-client";
import { MdChat } from 'react-icons/md';
import { AuthContext } from 'contexts/authContext';

const socket = io();

export const Chat = () => {
    const { user } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const handleClick = () => setShow(!show);
    console.log(socket)

    useEffect(() => {
        const getMessages = async () => {
            socket.on('listMessages', (msgs) => {
                console.log("listMessages", msgs);
                console.log({ msgs })
                setMessages(msgs);
            });
        };
        getMessages();

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const submitMessage = async (message) => {
        const formattedMessage = {
            message: message,
            user: user?._id,
            userName: user?.name,
            timestamp: new Date().getTime()
        }
        socket.emit('submitMessage', formattedMessage);
    };

    const ChatLine = (props) => {
        const { message } = props;
        return (
            <div className="flex w-full my-2">
                <img
                    className='rounded-full w-10 h-10 mr-2'
                    src={message.user.avatar}
                    alt={message.user.name}
                />
                <div className="flex w-full pb-2 border-b-2 border-slate-100 mr-2 text-xs items-start">
                    <div className="text-slate-600">
                        <span className="mr-2">{message.user.name}:</span>
                    </div>
                    <p className="chat-line__message-text">{message.message}</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                className='absolute bottom-20 right-2 w-72 h-2/4
             flex items-center border-dashed border-2 bg-white overflow-y-auto shadow-md flex-col overflow-x-hidden p-2'
                style={{
                    display: show ? 'block' : 'none',
                }}
            >
                <div className='w-full'>
                    {messages.map(message => <ChatLine key={message.id} message={message} />)}
                </div>
                <input
                    className='w-full h-10 px-4 border-slate-300 bg-white outline-none'
                    placeholder='Escribe un mensaje'
                    type="text"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            submitMessage(e.target.value);
                            e.target.value = '';
                        }
                    }}
                />
            </div>
            <div
                className='absolute bottom-2 right-2 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white cursor-pointer'
                onClick={handleClick}
            >
                <MdChat />
            </div>
        </>
    )
}
