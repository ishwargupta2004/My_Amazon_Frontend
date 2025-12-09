import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router";

const RelatedProduct = ({ category }) => {
  const { products,addToCart } = useContext(AppContext);
  const [RelatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() == category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          {RelatedProduct.map((product) => (
            <div
              key={product._id}
              className="col-lg-4 col-md-6 my-3 d-flex justify-content-center"
            >
              <div className="card product-card" style={{ width: "18rem" }}>
                <Link
                  to={`/product/${product._id}`}
                  className="image-container"
                >
                  <img
                    src={product.imgSrc}
                    className="card-img-top"
                    alt={product.title}
                  />
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="product-price">{product.price} ₹</p>
                  <div className="button-container">
                    <button
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
                      className="btn add-to-cart"
                    >
                      🛒 Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
