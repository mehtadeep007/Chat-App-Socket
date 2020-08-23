import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from 'query-string';

import InfoBar from '../InfoBar/InfoBar';
import TextContainer from '../TextContainer/TextContainer';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css';
let socket;

const Chat=({location})=>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        // console.log(location.search)

        socket = io(ENDPOINT);
        // console.log(socket)
        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
        });
        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }
    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
          setMessages([ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message,messages);

    return (
        <div className="outerContainer">
          <div className="container">
              <InfoBar room={room} />
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
          <TextContainer users={users}/>
        </div>
      );
}

export default Chat;