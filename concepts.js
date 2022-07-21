
import "./Header.css";
import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { CLEAR_MESSAGE } from "../actions/types";
import { ReactComponent as LogoIcon } from "../img/icon.svg";
import { ReactComponent as UserAvatar } from "../img/user.svg";
import { ReactComponent as MenuIcon } from "../img/menu-svgrepo-com.svg";
import { ReactComponent as HomeIcon } from "../img/home.svg";
import UserinfoModal from "./UserinfoModal";
import { Dropdown } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(CLEAR_MESSAGE()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="main-header row pt-1 p-0 m-0">
      <div className="col-8 p-0 d-flex justify-content-start align-items-center">
        <a href="/">
          <HomeIcon className="header-homeicon" />
        </a>
        <div id="main-vector-img">
          <LogoIcon />
        </div>
        <label className="main-site-text text-white mt-0 ms-3">BUGLE AI</label>
        <div className="ps-5 d-flex justify-content-start align-items-center">
          <button
            className="header-btn btn btn-default fs-6 text-white border-white rounded-5 me-5"
            onClick={() => {
              navigate("/demo");
            }}
          >
            WATCH DEMO
          </button>
          {currentUser &&
          (currentUser.subscriptionStatus === "active" ||
            currentUser.subscriptionStatus === "trialing") ? (
            <button
              className="header-btn btn btn-md btn-success rounded-5"
              style={{}}
              onClick={() => {
                navigate("/mainscreen");
              }}
            >
              CREATE NEWSLETTER
            </button>
          ) : (
            <button
              className="header-btn btn btn-md btn-success rounded-5"
              style={{}}
              onClick={() => {
                window.location.href = process.env.REACT_APP_PAYMENT_URL;
              }}
            >
              START FREE TRIAL
            </button>
          )}
        </div>
      </div>

      <div className="col-4 p-0 d-flex justify-content-end align-items-center">
        {currentUser ? (
          <button
            id="btn-contact"
            className="header-btn btn btn-md btn-default text-white border-white rounded-5 me-5"
            onClick={() => {
              logOut();
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            id="btn-contact"
            className="header-btn btn btn-md btn-default text-white border-white rounded-5 me-5"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
        <button
          id="btn-contact"
          className="header-btn btn btn-md btn-default text-white border-white rounded-5 me-5"
          onClick={() => {
            navigate("/contactus");
          }}
        >
          Contact Us
        </button>
        {currentUser ? (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="text-white me-2">{currentUser.username}</div>

            <div>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle id="header-avatar-user">
                  <div>
                    <UserAvatar
                      style={{
                        width: "20px",
                        height: "20px"
                      }}
                    />
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="bg-black">
                  <div>
                    <Dropdown.Item href="/profile" style={{ color: "white" }}>
                      User Info
                    </Dropdown.Item>
                    {currentUser.roles[0] === "ROLE_ADMIN" && (
                      <Dropdown.Item href="/admin" style={{ color: "white" }}>
                        Admin
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={logOut} style={{ color: "white" }}>
                      Logout
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div>
              <div id="header-avatar-drop" onClick={openModal}>
                <MenuIcon />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div id="header-avatar-user">
              <UserAvatar
                style={{
                  width: "20px",
                  height: "20px"
                }}
                onClick={() => {
                  navigate("/login");
                }}
              />
            </div>
            <div id="header-avatar-drop" onClick={openModal}>
              <MenuIcon />
            </div>
          </div>
        )}
      </div>
      <UserinfoModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

            