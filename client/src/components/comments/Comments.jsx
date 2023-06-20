import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

const Comments = (postId) => {
  const { currentUser } = useContext(AuthContext);
  const [reloadComments, setreloadComments] = useState(false);

  const [content, setContent] = useState("");
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchComment = async (postId) => {
      const res = await axios.post("/posts/getComments", postId);
      setInfo(res.data);
    };
    fetchComment(postId);
  }, [reloadComments]);
  const submitComment = async () => {
    setreloadComments(true);
    try {
      await axios.post("/posts/addComment", {
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
        <img src={currentUser.profileImage} alt="" />
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
          <img src={comment.user.profileImage} alt="" />
          <div className="info">
            <span>{comment.user.name}</span>
            <p>{comment.content}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
