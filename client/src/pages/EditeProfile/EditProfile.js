import React, { useContext, useState } from "react";
import "./EditProfile.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    UserId: currentUser.id,
    profileImage: "",
    coverImage: "",
    name: "",
    email: "",
    password: "",
    location: "",
    website: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/users/updateUser", formData);
    console.log(res);
    setFormData({
      profileImage: "",
      coverImage: "",
      name: "",
      email: "",
      password: "",
      location: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    });
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
          value={formData.profileImage}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cover-image">Cover Image</label>
        <input
          type="file"
          id="cover-image"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
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
          onChange={handleChange}
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
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
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
