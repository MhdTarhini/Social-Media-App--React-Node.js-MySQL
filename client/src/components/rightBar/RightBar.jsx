import { useEffect, useState } from "react";
import "./rightBar.scss";
import axios from "axios";
import { Link } from "react-router-dom";

import io from "socket.io-client";

const RightBar = () => {
  const [activityContent, setActivityContent] = useState([]);
  const ROOM = ["NEWS", "SPORT", "FOOD"];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("/activity");
        setActivityContent(res.data.reverse().slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [setActivityContent]);
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Online Rooms</span>
          {ROOM.map((room) => {
            return (
              <Link
                to={`/chat/${room}`}
                key={room}
                // onClick={() => {
                // const socket = io.connect("http://localhost:4000");
                // socket.emit("join_room", room);}}
              >
                <div className="user">
                  <div className="userInfo">
                    <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <div className="online" />
                    <span>{room}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          {activityContent.map((activity) => {
            return (
              <div className="user" key={activity.id}>
                <div className="userInfo">
                  <img src={activity.user.profileImage} alt="" />
                  <p>
                    <span>{activity.user.name}</span> {activity.content}
                  </p>
                </div>
                <span>1 min ago</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
