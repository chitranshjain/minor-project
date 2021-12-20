import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { toast } from "react-toastify";
import avatar from "../Images/avatar.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-bootstrap";
import socketIOClient from "socket.io-client";

export default function Chat(props) {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const { userId } = props.match.params;
  const [chat, setChat] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  // setTimeout(() => {
  //   if (selectedUser && selectedUser._id) {
  //     axios({
  //       method: "GET",
  //       url: `https://is-project-b9.herokuapp.com/api/chat/${userId}/${selectedUser._id}`,
  //     })
  //       .then((response) => {
  //         if (response.data.chat !== chat) {
  //           let chatM = response.data.chat;
  //           chatM.messages.reverse();
  //           setChat(chatM);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, 5000);

  const getUsers = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/users",
    })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getChat = (secondId) => {
    secondId &&
      axios({
        method: "GET",
        url: `http://localhost:8080/api/chat/${userId}/${secondId}`,
      })
        .then((response) => {
          console.log(response.data);
          let chatM = response.data.chat;
          chatM.messages.reverse();
          setChat(chatM);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const addMessage = () => {
    axios({
      method: "POST",
      url: `http://localhost:8080/api/chat/addMessage/${chat._id}`,
      data: {
        sender: userId,
        receiver: selectedUser.id,
        message: message,
      },
    })
      .then((response) => {
        console.log(response.data);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div class="chat-main-container">
        <div class="right-side">
          {users &&
            users.length > 0 &&
            users.map((user) => {
              if (user.id != userId) {
                return (
                  <div
                    onClick={() => {
                      setSelectedUser(user);
                      getChat(user.id);
                    }}
                  >
                    <p>{user.name}</p>
                  </div>
                );
              }
            })}
        </div>
        <div class="chatbox">
          <div class="chatbox__support chatbox--active">
            <div class="chatbox__header">
              <div class="chatbox__image--header">
                <img
                  src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                  alt="something"
                />
              </div>
              <div class="chatbox__content--header">
                {selectedUser ? (
                  <h4 class="chatbox__heading--header">{selectedUser.name}</h4>
                ) : (
                  <h4 class="chatbox__heading--header">SAM</h4>
                )}
                <p class="chatbox__description--header">
                  Hi. My name is Sam. How can I help you?
                </p>
              </div>
            </div>{" "}
            <div class="chatbox__messages">
              {chat && chat.messages &&
                chat.messages.map((chat) => {
                  return <div class="inner_msg">{chat.message}</div>;
                })}
            </div>
            <div class="chatbox__footer">
              <input
                type="text"
                onChange={handleMessageChange}
                placeholder="Write a message..."
              />
              <button
                onClick={addMessage}
                class="chatbox__send--footer send__button"
              >
                Send
              </button>
            </div>
          </div>
          <div class="chatbox__button">
            <button>
              <img src="./images/chatbox-icon.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
