const axios = require("axios");
const express = require("express");
const ActivityModel = require("../models/activityTracker");
const app = express();
const activityTracker = async (req, res, next) => {
  const url = req.originalUrl;
  const endpoint = url.split("/").pop();
  const { userId } = req.body;
  const addActivity = async (content, userId) => {
    try {
      await ActivityModel.create({ content, userId });
    } catch (error) {
      console.log(error);
    }
  };
  if (req.method === "POST") {
    method = "add a new";
  } else if (req.method === "PUT") {
    mehode = "change this";
  } else if (req.method === "DELETE") {
    mehode = "delete this";
  }
  if (endpoint === "addComment") {
    content = `${method} comment`;
    addActivity(content, userId);
  } else if (endpoint === "addlike") {
    content = `${method} like to a post`;
    addActivity(content, userId);
  } else if (endpoint === "addPost") {
    content = `${method} post`;
    addActivity(content, userId);
  }
  console.log(` ${req.method} ${req.originalUrl}`);

  next();
};
module.exports = activityTracker;
