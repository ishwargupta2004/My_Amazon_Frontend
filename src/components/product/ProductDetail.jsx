import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";

const ProductDetail = () => {
  const [products, setProducts] = useState();
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);

  // const url = "http://localhost:1000/api";
  const url = "https://my-amazon-backend.onrender.com/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      //   console.log(api.data.product);
      setProducts(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container my-5">
        <div className="product-detail-card">
          <div className="image-section">
            <img
              src={products?.imgSrc}
              alt={products?.title}
              className="product-image"
            />
          </div>
          <div className="info-section">
            <h2 className="product-title">{products?.title}</h2>
            <p className="product-description">{products?.description}</p>
            <p className="product-price">{products?.price} ₹</p>
            <button
              onClick={() =>
                addToCart(
                  products?._id,
                  products?.title,
                  products?.price,
                  1,
                  products?.imgSrc
                )
              }
              className="btn add-to-cart"
            >
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-center my-5">Related Products</h2>
      <RelatedProduct category={products?.category} />
    </>
  );
};

export default ProductDetail;
