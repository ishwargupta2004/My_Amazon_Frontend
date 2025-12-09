import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router";
import VideoPlayer from "./VideoPlayer";

const ShowProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  return (
    <>
      <VideoPlayer src="https://www.apple.com/105/media/ww/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome3/large.mp4" />

      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          {products.map((product) => (
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
                      className="btn add-to-cart"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.title,
                          product.price,
                          1,
                          product.imgSrc
                        )
                      }
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

export default ShowProduct;
