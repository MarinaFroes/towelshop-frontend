import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Message,
  Segment,
  Container,
  Modal,
} from "semantic-ui-react";

import { AppState, User, UserParams } from "../types";
import {
  updateUser,
  deleteUser,
  getUserDetails,
  userUpdateResetAction,
  userDetailsResetAction,
  logoutUser,
} from "../redux/actions/user";

const INITIAL_USER: User = {
  _id: "",
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
};

const EditUser = () => {
  const { userId } = useParams<UserParams>();

  const [user, setUser] = useState(INITIAL_USER);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { success: successUpdate, error, loading } = useSelector(
    (state: AppState) => state.userUpdateProfile
  );

  const { success: successDelete } = useSelector(
    (state: AppState) => state.userDelete
  );

  const { authedUser } = useSelector((state: AppState) => state.userLogin);

  const { user: userDetails } = useSelector(
    (state: AppState) => state.userDetails
  );

  useEffect(() => {
    if (
      (authedUser && authedUser._id !== userId) ||
      !userDetails ||
      userDetails._id !== userId
    ) {
      dispatch(getUserDetails(userId));
    }

    userDetails &&
      setUser({
        _id: userDetails._id,
        userName: userDetails.userName,
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email,
      });

    if (successUpdate) {
      history.push("/account");
      dispatch(userUpdateResetAction());
      dispatch(userDetailsResetAction());
    }

    if (successDelete) {
      dispatch(logoutUser());
      setModal(false);
    }
  }, [
    authedUser,
    dispatch,
    successUpdate,
    history,
    userDetails,
    userId,
    successDelete,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(user));
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  if (!authedUser || authedUser._id !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <Container text style={{ marginTop: "2em" }}>
      <Message
        attached
        icon="setting"
        header="Manage account"
        content={`Hello ${
          authedUser.firstName ? authedUser.firstName : "there"
        }, here you can manage your account`}
        color="teal"
        style={{
          marginBottom: "1em",
        }}
      />
      {error && <Message error header="Oops!" content={error} />}

      <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
        <Segment>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              placeholder="Ford"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              label="Last Name"
              placeholder="Prefect"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="User Name"
              placeholder="fordPrefect"
              name="userName"
              value={user.userName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              placeholder="fprefect@example.com"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            icon="signup"
            type="submit"
            color="orange"
            content="Update profile"
            disabled={loading}
          />
          <Button
            icon="trash"
            color="red"
            content="Delete profile"
            onClick={(e) => {
              e.preventDefault();
              setModal(true);
            }}
          />
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>Confirm delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete your account?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setModal(false)} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={() => handleDeleteUser(user._id)}
              />
            </Modal.Actions>
          </Modal>
        </Segment>
      </Form>
    </Container>
  );
};

export default EditUser;
