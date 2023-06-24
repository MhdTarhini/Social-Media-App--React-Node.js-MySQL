import React, { useContext, useEffect, useState } from "react";
import "./chatRoom.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function ChatRoom() {
  const { currentUser } = useContext(AuthContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const param = useParams();
  socket.emit("join_room", param.RoomId);

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
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chatRoom">
      <div className="chatmain">
        <div className="chatname">
          <span>
            <i className="far fa-user"></i>
          </span>
          <div>{param.RoomId}</div>
        </div>

        <ul className="chatmessage-container" id="chatmessage-container">
          {messageList.map((message) => {
            return (
              <>
                {message.author === currentUser.name ? (
                  <li className="chatmessage-left" key={message.time}>
                    <p className="chatmessage">{message.message}</p>
                    <span>
                      {message.author} ● {message.time}
                    </span>
                  </li>
                ) : (
                  <li className="chatmessage-right" key={message.time}>
                    <p className="chatmessage">{message.message}</p>
                    <span>
                      {message.author} ● {message.time}
                    </span>
                  </li>
                )}
              </>
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
      <h3 className="chatclients-total" id="chatclient-total">
        Total clients: 2
      </h3>
    </div>
  );
}

export default ChatRoom;
