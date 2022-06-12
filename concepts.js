
import React from "react";
import Header from "../components/Header";

export default function ContactUs() {
  return (
    <div>
      <div style={{ height: "18vh" }}>
        <div className="home-main bg-black mb-0 bg-gradient py-3">
          <Header />
        </div>
        <div className="bg-black" style={{ height: "110vh" }}>
          <div className="text-white text-center d-flex flex-column justify-content-center align-content-center w-100 pt-5">
            <div className="pb-5">
              <h1>Contact Us</h1>
            </div>
            <div>
              <h4>Email: phil@robotpigeon.co</h4>
            </div>
            <div>
              <label className="fs-4">Bugle AI</label>
            </div>
            <div>
              <label className="fs-4">
                Colonial House Beverley East Yorkshire UK HU17 0LS
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

            