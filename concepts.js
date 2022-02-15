
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BugleIcaon } from "../img/icon_logo.svg";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const roles = ["user"];

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConPassword = (e) => {
    e.preventDefault();
    setConfirmpassword(e.target.value);
  };

  useEffect(() => {
    if (password !== confirmpassword) {
      setPasswordError("Passwords do not match");
    } else {
      // Password and confirm password match, do something
      setPasswordError("");
    }
  }, [password, confirmpassword]);

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();
    if (passwordError) {
      alert("Please confirm your password");
    } else if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password, roles))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container text-white rounded-4">
        <label className="fs-3 fw-bolder text-center mb-2">
          Welcome to the Bugle AI Club!
        </label>
        <label className="fs-5 fw-semibold text-center mb-3">
          Thanks for joining us, please finish your account setup below
        </label>
        <div className="profile-img-card">
          <BugleIcaon />
        </div>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group mb-3">
                <label htmlFor="username">Create a Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Confirm your Email</label>
                <Input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Create a Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={onChangeConPassword}
                />
                <div className="text-center w-100 p-2">
                  {passwordError && (
                    <span className="text-center bg-danger bg-opacity-50 mt-5 w-100 p-2">
                      {passwordError}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group mt-3">
                <button className="btn btn-primary btn-block float-end">
                  Sign Up
                </button>
                <button
                  className="btn btn-sm btn-white border-0 text-decoration-underline mt-4 text-white"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Already have an account? Login here
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
              <button
                className="btn btn-sm btn-white bg-black text-white border-0 text-decoration-underline mt-4"
                onClick={navigate("/login")}
              >
                Signin now
              </button>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;

            