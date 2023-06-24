import { useEffect, useState } from "react";
import "./rightBar.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");


const RightBar = () => {
  const [activityContent, setActivityContent] = useState([]);
  const [addRoom, setAddRoom] = useState(false);
  const [newRoomInfo, setNewRoomInfo] = useState({
    RoomName: "",
    RoomImage: "",
  });
  const ROOM = ["NEWS", "SPORT", "FOOD"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewRoom = () => {
    console.log(newRoomInfo);
    setNewRoomInfo({
      RoomName: "",
      RoomImage: "",
    });
  };
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
                style={{ textDecoration: "none" }}>
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
          <div
            onClick={() => setAddRoom(!addRoom)}
            style={{ cursor: "pointer" }}>
            + ADD NEW ROOM
          </div>
          {addRoom && (
            <>
              <input
                type="text"
                placeholder="Room Name"
                name="RoomName"
                value={newRoomInfo.RoomName}
                onChange={handleInputChange}
              />
              <input
                type="file"
                name="RoomImage"
                value={newRoomInfo.RoomImage}
                onChange={handleInputChange}
              />
              <button onClick={addNewRoom}>ADD ROOM</button>
            </>
          )}
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
