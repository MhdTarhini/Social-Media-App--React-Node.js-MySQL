import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./posts.scss";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Posts = () => {
  const [postsInfo, setPostsInfo] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/`);
        params.id
          ? setPostsInfo(
              res.data.filter((item) => item.userId === parseInt(params.id))
            )
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
