import React, { useContext, useState } from "react";
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

import { Link, useLocation, useNavigate } from "react-router";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterByCategory = (cat) => {
    if (cat == "All Products") {
      setFilteredData(products);
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 sticky-top shadow">
        <div className="container-fluid">
          {/* Left Section - Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <FaAmazon className="text-warning fs-2 me-2" />
            <span className="fs-4 fw-bold">My_Amazon</span>
          </Link>

          <form
            className="d-flex mx-auto search-container"
            onSubmit={submitHandler}
          >
            <input
              className="form-control search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
            <button className="btn btn-warning search-button" type="submit">
              <FaSearch />
            </button>
          </form>

          {isAuthenticated && (
            <>
              <Link
                to="/cart"
                className="btn btn-warning position-relative cart-btn"
              >
                <FaShoppingCart className="fs-4" />
                {cart?.items?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </Link>

              <Link to={"/profile"} className="btn btn-info mx-3">
                profile
              </Link>

              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to={"/login"} className="btn btn-secondary mx-3">
                login
              </Link>
              <Link to={"/register"} className="btn btn-info mx-3">
                register
              </Link>
            </>
          )}
        </div>
      </nav>

      {location.pathname == "/" && (
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
    </>
  );
};

export default Navbar;
