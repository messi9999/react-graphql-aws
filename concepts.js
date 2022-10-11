
import React, { useState } from "react";
import video from "../video/demo.mp4";
import Header from "./Header";
const VideoPlayer = () => {
  return (
    <div className="home-main bg-black mb-0 bg-gradient py-3">
      <div style={{ height: "18vh" }}>
        <Header />
      </div>
      <div
        className="vh-100"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <video width="65%" height="55%" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;

            