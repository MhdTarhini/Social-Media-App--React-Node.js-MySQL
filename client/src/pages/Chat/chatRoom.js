import React, { useContext, useEffect, useRef, useState } from "react";
import "./chatRoom.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function ChatRoom() {
  const { currentUser } = useContext(AuthContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageContainerRef = useRef(null);

  const param = useParams();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: param.RoomId,
        author: currentUser.name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.emit("join_room", param.RoomId);

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    return () => {
      socket.off("receive_message");
    };
  }, [messageList, param.RoomId]);
  return (
    <div className="chatRoom">
      <div className="chatmain">
        <div className="chatname">
          <span>
            <i className="far fa-user"></i>
          </span>
          <div>{param.RoomId}</div>
        </div>

        <ul
          className="chatmessage-container"
          id="chatmessage-container"
          ref={messageContainerRef}>
          {messageList.map((message) => {
            return (
              <div
                key={`${message.author} ● ${new Date(
                  Date.now()
                ).getSeconds()} , ${
                  Math.floor(Math.random() * (9999 - 1 + 1)) + 1
                }`}>
                {message.author === currentUser.name ? (
                  <li className="chatmessage-left">
                    <p className="chatmessage">{message.message}</p>
                    <span>
                      {message.author} ● {message.time}
                    </span>
                  </li>
                ) : (
                  <li className="chatmessage-right">
                    <p className="chatmessage">{message.message}</p>
                    <span>
                      {message.author} ● {message.time}
                    </span>
                  </li>
                )}
              </div>
            );
          })}

        </ul>
        <form
          className="chatmessage-form"
          id="chatmessage-form"
          onSubmit={sendMessage}>
          <input
            type="text"
            name="message"
            id="chatmessage-input"
            className="chatmessage-input"
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <div className="v-divider"></div>
          <button type="submit" className="chatsend-button">
            send
            <span>
              <i className="fas fa-paper-plane"></i>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
