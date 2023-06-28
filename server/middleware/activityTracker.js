const axios = require("axios");
const ActivityModel = require("../models/activityTracker");

const activityTracker = async (req, res, next) => {
  const url = req.originalUrl;
  const endpoint = url.split("/").pop();

  const userId = req.body.userId || req.params.userId;
  const addActivity = async (content, userId) => {
    try {
      await ActivityModel.create({ content, userId });
    } catch (error) {
      console.log(error);
    }
  };

  let method = "";
  if (req.method === "POST") {
    method = "add a new";
  } else if (req.method === "PUT") {
    method = "change this";
  } else if (req.method === "DELETE") {
    method = "delete this";
  }

  let content = "";
  if (endpoint === "addComment") {
    content = `${method} comment`;
    addActivity(content, userId);
  } else if (endpoint === "addlike") {
    content = `${method} like to a post`;
    addActivity(content, userId);
  } else if (endpoint === "addPost") {
    content = `${method} post`;
    addActivity(content, userId);
  } else if (endpoint === "updateUser") {
    content = `${method} Update profile`;
    addActivity(content, userId);
  } else if (endpoint === userId) {
    content = `just Update profile`;
    addActivity(content, userId);
  }

  next();
};

module.exports = activityTracker;

// console.log(` ${req.method} ${req.originalUrl}`);
