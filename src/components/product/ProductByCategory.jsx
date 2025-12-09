import React, { useContext } from "react";
import {
  FaAmazon,
  FaShoppingCart,
  FaSearch,
  FaMobileAlt,
  FaCamera,
  FaLaptop,
  FaTabletAlt,
  FaClock,
  FaHeadphones,
  FaThLarge,
  FaRupeeSign,
} from "react-icons/fa";

import { Link, useLocation, useNavigate, useParams } from "react-router";
import AppContext from "../../context/AppContext";

import VideoPlayer from "./VideoPlayer";
import { Videos } from "../../context/data";

const ProductByCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cat } = useParams();

  const { setFilteredData, products, filteredData, addToCart } =
    useContext(AppContext);

  const filterByCategory = (cat) => {
    if (cat == "All Products") {
      setFilteredData(products);
      navigate("/");
      return;
    }
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const categories = [
    // { name: "All Products", icon: <FaThLarge /> },
    { name: "Mobiles", icon: <FaMobileAlt /> },
    { name: "Laptops", icon: <FaLaptop /> },
    { name: "Tablets", icon: <FaTabletAlt /> },
    { name: "Watches", icon: <FaClock /> },
    // { name: "Headphones", icon: <FaHeadphones /> },
    // { name: "Cameras", icon: <FaCamera /> },
  ];

  const videoByCategory = Videos.find(
    (vid) => vid.category.toLowerCase() == cat.toLowerCase()
  );

  return (
    <>
      {location.pathname == `/product/category/${cat}` && (
        <div className="container bg-dark text-light  p-4 rounded shadow-lg">
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
            <div
              className="d-flex align-items-center gap-2 px-3 py-2 rounded bg-secondary text-light fw-bold"
              style={{ cursor: "pointer", transition: "0.3s" }}
              onClick={() => {
                setFilteredData(products), navigate("/");
              }}
            >
              <FaThLarge />
              <span> All Products </span>
            </div>

            {categories?.map(({ name, icon }) => (
              <div
                key={name}
                className="d-flex align-items-center gap-2 px-3 py-2 rounded bg-secondary text-light fw-bold"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => {
                  filterByCategory(name), navigate(`/product/category/${name}`);
                }}
              >
                {icon} <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <VideoPlayer src={videoByCategory.url} />

      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          {filteredData.map((product) => (
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

export default ProductByCategory;
