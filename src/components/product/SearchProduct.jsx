import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);

  const { term } = useParams();

  //   console.log(useParams())

  useEffect(() => {
    setSearchProduct(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, products]);

  return (
    <>
      {searchProduct.length == 0 ? (
        <>
          <div className="container text-center my-5">
            <h1>No Product Find</h1>

            <Link to={"/"} className="btn btn-lg btn-warning">
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <div className="container my-5">
          <div className="row d-flex justify-content-center">
            {searchProduct.map((product) => (
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
      )}
    </>
  );
};

export default SearchProduct;
