import React, { useState } from 'react';
import { MdChat } from 'react-icons/md';

export const Chat = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const messages = [
        {
            id: 1,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            user: {
                id: 1,
                name: 'Juan',
                avatar: 'https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg'
            },
        },
        {
            id: 2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            user: {
                id: 2,
                name: 'Juan',
                avatar: 'https://avatars.dicebear.com/api/adventurer/hola.svg'
            },
        },
    ];

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
             flex items-center border-dashed border-2 bg-white overflow-y-auto shadow-md flex-col overflow-x-hidden py-2'
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
