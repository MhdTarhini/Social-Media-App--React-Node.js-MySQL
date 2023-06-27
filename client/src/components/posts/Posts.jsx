import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Posts = (props) => {
  const [postsInfo, setPostsInfo] = useState([]);
  const { userId } = props;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/`);
        userId
          ? setPostsInfo(res.data.filter((item) => item.userId === userId))
          : setPostsInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="posts">
      {postsInfo.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
