import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "axios";

const Posts = () => {
  const [postsInfo, setPostsInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/`);
        setPostsInfo(res.data);
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
