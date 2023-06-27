import "./share.scss";
import Image from "../../assets/img.png";
import Video from "../../assets/4.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [postcontent, setPostcontent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postVideo, setPostVideo] = useState(null);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", postImage);
      const res = await axios.post("/uploadImage", formData);
      console.log(res.data);
      return res.data.filename;
    } catch (error) {
      console.log(error);
    }
  };
  const uploadVideo = async () => {
    try {
      const formData = new FormData();
      formData.append("video", postVideo);
      const res = await axios.post("/uploadVideo", formData);
      return res.data.filename;
    } catch (error) {
      console.log(error);
    }
  };
  const sharePost = async () => {
    try {
      await axios.post("/posts/addPost", {
        content: postcontent,
        postImage: postImage ? await uploadImage() : "",
        postVideo: postVideo ? await uploadVideo() : "",
        createdAt: moment().format(),
        userId: currentUser.id,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`../uploads/Images/${currentUser.profileImage}`} alt="" />
          <input
            type="text"
            value={postcontent}
            placeholder={`What's on your mind ${currentUser.name}?`}
            onChange={(e) => setPostcontent(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="Imagefile"
              name="file"
              onChange={(e) => setPostImage(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="Imagefile">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <input
                type="file"
                id="Videofile"
                name="file"
                onChange={(e) => setPostVideo(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label htmlFor="Videofile">
                <div className="item">
                  <img src={Video} alt="" />
                  <span>Add Video</span>
                </div>
              </label>
            </div>
          </div>
          <div className="right">
            <button onClick={() => sharePost()}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
