import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from 'query-string';

import './Chat.css';
let socket;

const Chat=({location})=>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        // console.log(location.search)
        // console.log(name)
        // console.log(room)
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

    return(
        <h1>Chat</h1>
    )
}

export default Chat;