import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [countlikes, setCountLikes] = useState("");
  const [countcomments, setCountComment] = useState("");

  useEffect(() => {
    const fetchLikedPost = async () => {
      const res = await axios.post("/likes", {
        postId: post.id,
        UserId: currentUser.id,
      });
      setLiked(res.data);
    };
    fetchLikedPost();
    countLikes();
    countComments();
  }, [currentUser.id, post.id, liked]);

  const likedPost = async () => {
    const updatedLiked = {
      likeStatus: !liked,
      postId: post.id,
      UserId: currentUser.id,
      createdAt: moment().format(),
    };
    setLiked(updatedLiked.likeStatus);
    try {
      await axios.post("/likes/addlike", updatedLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const countLikes = async () => {
    try {
      const response = await axios.get(`/likes/count?postId=${post.id}`);
      setCountLikes(response.data.count);
      // console.log("Number of rows with the same postId:", count);
    } catch (error) {
      console.log(error);
    }
  };
  const countComments = async (postId) => {
    try {
      const response = await axios.get(`/comments/count?postId=${post.id}`);
      setCountComment(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`../uploads/Images/${post.user.profileImage}`} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{post.user.name}</span>
              </Link>
              <span className="date">
                {moment(post.createdAt, "YYYYMMDD").fromNow()}
              </span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.content}</p>
          {post.postImage && (
            <img src={`../uploads/Images/${post.postImage}`} alt="" />
          )}
          {post.postVideo && (
            <video width="750" height="300" controls>
              <source
                src={`../uploads/Videos/${post.postVideo}`}
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className="info">
          <div className="item" onClick={() => likedPost()}>
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {countlikes} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {countcomments} Comments
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
