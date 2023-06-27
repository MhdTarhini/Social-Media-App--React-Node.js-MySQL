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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const params = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/getuser/${params.id}`);
        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="profile">
      <div className="images">
        <img
          src={`../uploads/Images/${profile.coverImage}`}
          alt=""
          className="cover"
        />
        <img
          src={`../uploads/Images/${profile.profileImage}`}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href={`${profile.facebook}`}>
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href={`${profile.instagram}`}>
              <InstagramIcon fontSize="large" />
            </a>
            <a href={`${profile.twitter}`}>
              <TwitterIcon fontSize="large" />
            </a>
            <a href={`${profile.linkedin}`}>
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{profile.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{profile.location}</span>
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
            {/* <EmailOutlinedIcon />
            <MoreVertIcon /> */}
          </div>
        </div>
        <Posts userId={profile.id} />
      </div>
    </div>
  );
};

export default Profile;
