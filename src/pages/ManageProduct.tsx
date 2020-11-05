import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";

import ProductList from "../components/ProductList";
import { AppState } from "../types";

const ManageProduct = () => {
  const { authedUser } = useSelector((state: AppState) => state.userLogin);

  if (!authedUser || authedUser.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <Container style={{ margin: "2em" }}>
      <Link to="/create">
        <Button
          icon="add square"
          color="teal"
          floated="right"
          content="Create new product"
        />
      </Link>
      <ProductList />
    </Container>
  );
};

export default ManageProduct;
