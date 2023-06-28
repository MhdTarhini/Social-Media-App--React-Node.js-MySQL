import React, { useContext, useState } from "react";
import "./EditProfile.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: currentUser.id || "",
    profileImage: currentUser.profileImage || "",
    coverImage: currentUser.coverImage || "",
    name: currentUser.name || "",
    email: currentUser.email || "",
    location: currentUser.location || "",
    facebook: currentUser.facebook || "",
    instagram: currentUser.instagram || "",
    linkedin: currentUser.linkedin || "",
    twitter: currentUser.twitter || "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const profileImages = async () => {
    try {
      if (profileImage !== "") {
        const profileImageData = new FormData();
        profileImageData.append("file", profileImage);
        const profileImageRes = await axios.post(
          "/uploadImage",
          profileImageData
        );
        return profileImageRes.data.filename;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const coverImages = async () => {
    try {
      if (coverImage !== "") {
        const coverImageData = new FormData();
        coverImageData.append("file", coverImage);
        const coverImageRes = await axios.post("/uploadImage", coverImageData);
        return coverImageRes.data.filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ProfileImageURL = await profileImages();
    const coverImageURL = await coverImages();
    const filteredState = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== currentUser[key]) {
        filteredState[key] = formData[key];
      }
    });
    if (ProfileImageURL) {
      filteredState["profileImage"] = ProfileImageURL;
    }
    if (coverImageURL) {
      filteredState["coverImage"] = coverImageURL;
    }

    try {
      const res = await axios.patch(
        `/users/updateUser/${currentUser.id}`,
        filteredState
      );
      if (res.statusText === "OK") {
        const existingState = JSON.parse(localStorage.getItem("user"));
        // Iterate over the filteredState object and update the existing state
        Object.entries(filteredState).forEach(([key, value]) => {
          existingState[key] = value;
        });
        // Update the localStorage with the updated state
        localStorage.setItem("user", JSON.stringify(existingState));
        window.location.reload();
        window.location.href = `/profile/${currentUser.id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="profile-image">Profile Image</label>
        <input
          type="file"
          id="profile-image"
          name="profileImage"
          // value={formData.profileImage}
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cover-image">Cover Image</label>
        <input
          type="file"
          id="cover-image"
          name="coverImage"
          // value={formData.coverImage}
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          // onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          value={formData.facebook}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="instagram">Instagram</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          id="twitter"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfile;
