import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";
import Posts from "../posts/Posts";
import Post from "../post/Post";

const Comments = (postId) => {
  const { currentUser } = useContext(AuthContext);
  const [reloadComments, setreloadComments] = useState(false);

  const [content, setContent] = useState("");
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchComment = async (postId) => {
      const res = await axios.post("/comments", postId);
      setInfo(res.data);
    };
    fetchComment(postId);
  }, [reloadComments, postId]);
  const submitComment = async () => {
    setreloadComments(true);
    try {
      await axios.post("/comments/addComment", {
        content: content,
        postId: postId.postId,
        userId: currentUser.id,
        createdAt: moment().format(),
      });
      setContent("");
      setreloadComments(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={`../uploads/Images/${currentUser.profileImage}`} alt="" />
        <input
          value={content}
          type="text"
          placeholder="write a comment"
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={submitComment}>Send</button>
      </div>
      {info.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={`../uploads/Images/${comment.user.profileImage}`} alt="" />
          <div className="info">
            <span>{comment.user.name}</span>
            <p>{comment.content}</p>
          </div>
          <span className="date">
            {moment().startOf(comment.createdAt).fromNow()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
