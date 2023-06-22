const axios = require("axios");
const express = require("express");
const ActivityModel = require("../models/activityTracker");
// const app = express();
// const router = express.Router();
// const WebSocket=require('ws')
const wss = require("../websocket");
const activityTracker = async (req, res, next) => {
  // (async()=>{
  //   try {
  //     const ws = new WebSocket("ws://localhost:3001");
  //     let dataBuffer = "";
  
  //     await new Promise((resolve, reject) => {
  //       ws.on("open", function open() {
  //         console.log("ActivityTracker WebSocket connection established");
  //         return resolve();
  //       });
  
  //       ws.on("message", function incoming(data) {
  //         console.log("ActivityTracker received message:", data);
  //         return dataBuffer += data;
  //       });

  //       ws.on("close", function close() {
  //         console.log("ActivityTracker WebSocket connection closed");
  //         return resolve();
  //       });
  
  //       ws.on("error", function error(err) {
  //         console.error(err);
  //         return reject(err);
  //       });
  //     });
  
  //     return res.send(`ActivityTraker Response from server: ${dataBuffer}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // })();
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
  // console.log(` ${req.method} ${req.originalUrl}`);
  next();
};
module.exports = activityTracker;
