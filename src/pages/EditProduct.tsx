import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
  Container,
} from "semantic-ui-react";

import {
  updateProduct,
  productCreateFailure,
  getProductDetails,
  productUpdateReset,
  productDetailsReset,
} from "../redux/actions/products";
import { AppState, Product, ProductParams } from "../types";

const INITIAL_PRODUCT = {
  _id: "",
  name: "",
  description: "",
  categories: "",
  countInStock: 0,
  variant: "",
  size: "",
  price: 0.0,
};

const EditProduct = () => {
  const { productId } = useParams<ProductParams>();

  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [image, setImage] = useState<null | File>(null);
  const [mediaPreview, setMediaPreview] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, success, error } = useSelector(
    (state: AppState) => state.productUpdate
  );

  const { product: selectedProduct } = useSelector(
    (state: AppState) => state.productDetails
  );

  const { authedUser } = useSelector((state: AppState) => state.userLogin);

  useEffect(() => {
    if (!selectedProduct || selectedProduct._id !== productId) {
      dispatch(getProductDetails(productId));
    }

    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name,
        _id: selectedProduct._id,
        description: selectedProduct.description,
        price: selectedProduct.price,
        countInStock: selectedProduct.countInStock,
        variant: selectedProduct.variant || "",
        size: selectedProduct.size || "",
        categories: selectedProduct.categories.join(","),
      });
      selectedProduct.mediaUrl && setMediaPreview(selectedProduct.mediaUrl);
    }

    if (success) {
      dispatch(productUpdateReset());
      dispatch(productDetailsReset());
      history.push("/manage-product");
    }
  }, [dispatch, selectedProduct, productId, success, history]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setMediaPreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "reactreserve");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dglvomnoi/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const file = await response.json();
        const mediaUrl = file.secure_url;

        return mediaUrl;
      } catch (err) {
        console.error(err);
        dispatch(productCreateFailure("Could not create product. No image."));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let mediaUrl = "";

      if (image) {
        mediaUrl = await handleImageUpload();
      }

      const {
        _id,
        name,
        price,
        description,
        categories,
        variant,
        size,
        countInStock,
      } = product;

      const payload: Product = {
        _id,
        name,
        price: Number(price),
        categories: categories.split(","),
        variant,
        size,
        countInStock,
        description,
      };

      if (mediaUrl) {
        payload.mediaUrl = mediaUrl;
      }

      dispatch(updateProduct(payload));
    } catch (err) {
      console.error(err);
      dispatch(productCreateFailure(err));
    }
  };

  if (!authedUser || authedUser.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <Container style={{ margin: "2em" }}>
      <Header as="h2" block>
        <Icon name="edit" color="blue" />
        Edit product id {product._id}
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        {error && <Message error header="Oops!" content={error} />}
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="2-pack cotton towels"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="variant"
            label="Variant"
            placeholder="white"
            value={product.variant}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="categories"
            label="Categories"
            placeholder="accessory, utility"
            value={product.categories}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="20.00"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="size"
            label="Size"
            placeholder="large"
            value={product.size}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="countInStock"
            label="Quantity"
            placeholder="10"
            min="1"
            step="1"
            type="number"
            value={product.countInStock}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Update"
          disabled={!selectedProduct || loading}
          type="submit"
        />
      </Form>
    </Container>
  );
};

export default EditProduct;
