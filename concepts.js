
import "./UserinfoModal.css";
import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as LogoIcon } from "../img/icon.svg";
import { ReactComponent as UserAvatar } from "../img/user.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

export default function UserinfoModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  if (!isOpen) return null;
  return (
    <div>
      <Modal
        className="modal-user-info"
        show={isOpen}
        onHide={onClose}
        keyboard={false}
        centered={true}
        size="md"
      >
        <Modal.Header
          className="bg-dark border-bottom-0"
          closeButton
          closeVariant="white"
        >
          <Modal.Title>
            <div className="p-0 d-flex justify-content-start align-items-center">
              <div>
                <LogoIcon />
              </div>
              <label className="text-white mt-0 ms-3 fs-4">BUGLE AI</label>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="bg-dark text-white"
          style={{ outline: "none !important" }}
        >
          <div>
            {currentUser && (
              <div>
                <div className="fs-3 text-center mb-3 text-white">
                  {currentUser.username}
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center align-items-center">
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "40px",
                  backgroundColor: "#198754",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <a href="/profile">
                  <div id="user-avata">
                    <UserAvatar
                      id="user-avata"
                      style={{
                        width: "40px",
                        height: "40px"
                      }}
                    />
                  </div>
                </a>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="mt-4 btn btn-default fs-6 text-white border-white rounded-5 w-50"
                onClick={() => {
                  navigate("/demo");
                }}
              >
                WATCH DEMO
              </button>
              <button
                className="mt-4 btn btn-default fs-6 text-white border-white rounded-5 w-50"
                onClick={() => {
                  navigate("/contactus");
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
          {currentUser &&
          (currentUser.subscriptionStatus === "active" ||
            currentUser.subscriptionStatus === "trialing") ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="btn btn-md btn-success rounded-5"
                style={{ marginTop: "5vh", marginBottom: "5vh" }}
                onClick={() => {
                  navigate("/mainscreen");
                }}
              >
                CREATE NEWSLETTER
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button
                className="btn btn-md btn-success rounded-5"
                style={{ marginTop: "5vh", marginBottom: "5vh" }}
                onClick={() => {
                  navigate(`${process.env.REACT_APP_PAYMENT_URL}`);
                }}
              >
                START FREE TRIAL
              </button>
            </div>
          )}

          {currentUser && (
            <div>
              <div className="fs-5 text-center mb-3 text-white">
                <a href="/profile">User Info</a>
                <div>
                  <a href="/admin">Admin</a>
                </div>
                <div className="mt-3" onClick={logOut}>
                  LogOut
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

            