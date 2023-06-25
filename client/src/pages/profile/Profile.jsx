import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  return (
    <div className="profile">
      <div className="images">
        <img src={currentUser.coverImage} alt="" className="cover" />
        <img src={currentUser.profileImage} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{currentUser.location}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{currentUser.website}</span>
              </div>
            </div>
            {currentUser.id === parseInt(params.id) ? (
              <Link to={`/EditProfile/${currentUser.id}`}>
                {" "}
                <button>Edit Profile</button>
              </Link>
            ) : (
              <button>follow</button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
