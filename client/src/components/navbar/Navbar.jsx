import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social App</span>
        </Link>
        <div className="mode-change">
          {darkMode ? (
            <WbSunnyOutlinedIcon onClick={toggle} />
          ) : (
            <DarkModeOutlinedIcon onClick={toggle} />
          )}
        </div>
      </div>
      <div className="right">
        <div className="user" onClick={toggleDropdown}>
          <img src={`../uploads/Images/${currentUser.profileImage}`} alt="" />
          <span className="user-name">{currentUser.name}</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none" }}>
                <div className="dropdown-item">Profile</div>
              </Link>
              <div className="dropdown-item" onClick={logout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
