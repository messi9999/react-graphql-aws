
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { ReactComponent as EditIcon } from "../img/edit-button-svgrepo-com.svg";
import { ReactComponent as DeleteIcon } from "../img/icons8-delete.svg";

const BASE_URL = process.env.REACT_APP_BASEURL;

export default function Adminboard() {
  const [show, setShow] = useState(false);
  const [userID, setUserID] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [expireDate, setExpireDate] = useState();

  const handleClose = () => setShow(false);

  const [users, setUsers] = useState([]);

  const handleEdit = (userId, userName, userEmail, userExpireDate) => {
    // Logic to handle the edit action for the user with the specified ID
    setUserID(userId);
    setUsername(userName);
    setEmail(userEmail);
    setExpireDate(userExpireDate);

    setShow(true);
    console.log(`Editing user with ID: ${userID}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + "/all"); // Replace '/api/users' with your API endpoint
        setUsers(response.data); // Assuming the response contains an array of users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    // Logic to handle the delete action for the user with the specified ID
    const res = await axios.delete(BASE_URL + `/delete/${userId}`);
    console.log(res);
    window.location.reload();
  };

  const handleSaveChanges = async () => {
    const body = {
      username: username,
      email: email,
      expireDate: expireDate
    };
    const res1 = await axios.put(BASE_URL + `/update/${userID}`, body);
    console.log(res1);
    setShow(false);
    window.location.reload();
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (!currentUser.roles[0]) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="home-main bg-black mb-0 bg-gradient py-3">
      <div style={{ height: "18vh" }}>
        <Header />
        <div style={{ marginTop: "20vh" }}>
          <div>
            <h2 className="d-flex justify-content-start align-content-center">
              Admin
            </h2>
          </div>
          <div>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>ExpireDate</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.expireDate}</td>
                    <td className="d-flex justify-content-start align-content-center">
                      <div
                        onClick={() =>
                          handleEdit(
                            user.id,
                            user.username,
                            user.email,
                            user.expireDate
                          )
                        }
                      >
                        <EditIcon style={{ width: "25px", height: "auto" }} />
                      </div>
                      <div onClick={() => handleDelete(user.id)}>
                        <DeleteIcon style={{ width: "25px", height: "auto" }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{userID}</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ExpireDate</Form.Label>
              <Form.Control
                type="date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

            