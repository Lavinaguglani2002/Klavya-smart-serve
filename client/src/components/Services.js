

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "./Slider";
import ContactUs from "./Contact";
import Testimonial from "./Testimonials";
import "./service.css";
import api from "../axios";
import WhyChooseUs from "./Whychoose";

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    navigate(`/viewsmallcategory/${category.categoryname}/${subcategory.subcategoryname}`);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200;
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.categoryname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="services-wrapper">
      <h2 className="services-title">
        Explore Home Services <span>Anytime, Anywhere</span>
      </h2>

      <div className="category-search-bar">
        <input
          className="category-search"
          type="text"
          placeholder="🔍 Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="scroll-buttons">
          <button onClick={scrollLeft}>⏪</button>
          <button onClick={scrollRight}>⏩</button>
        </div>
      </div>

      <div className="category-bar" ref={scrollRef}>
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className={`category-item ${selectedCategory?._id === category._id ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
            data-tooltip={category.categoryname}
          >
            <img
              src={category.categoryimage}
              alt={category.categoryname}
              className="category-image"
            />
            <p>{category.categoryname}</p>
          </div>
        ))}
      </div>

      {selectedCategory && selectedCategory.subcategories.length > 0 && (
        <div className="subcategory-section">
          <h3 className="subcategory-title">{selectedCategory.categoryname} Subcategories</h3>
          <div className="subcategory-grid">
            {selectedCategory.subcategories.map((sub) => (
              <div
                key={sub._id}
                className="subcategory-card"
                onClick={() => handleSubcategoryClick(selectedCategory, sub)}
              >
                <div className="subcategory-badge">Popular</div>
                <img
                  src={sub.subcategoryimage}
                  alt={sub.subcategoryname}
                  className="subcategory-image"
                />
                <p>{sub.subcategoryname}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="extras">
        <Slider />
      {/* Content Box */}
      <div
        className=" mt-5 row align-items-center justify-content-center p-4 rounded-4 shadow-lg animate__animated animate__fadeInUp"
        style={{
          background: "#fefefe",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.07)",
        }}
      >
        {/* Left: Image */}
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <img
            src="https://static.wixstatic.com/media/b3dcef_118c67855c6c49a4ac9063504b19a677~mv2.jpg/v1/fill/w_980,h_528,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b3dcef_118c67855c6c49a4ac9063504b19a677~mv2.jpg" // Replace with your GIF path
            alt="Our Services"
            className="img-fluid rounded-4"
            style={{
              maxWidth: "90%",
              maxHeight: "400px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right: Text */}
        <div className="col-lg-6 px-4">
          <h3 className="fw-semibold mb-3 text-primary">We Provide More Than Just Services</h3>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            Welcome to <strong>Your Wellness World</strong> – a place where your <span className="text-success">style</span>, <span className="text-danger">health</span>, and <span className="text-warning">fitness</span> meet. Whether you want a stunning makeover, a relaxing spa session, or a fit body — we’ve got your back!
          </p>

          <ul className="list-unstyled mt-3" style={{ fontSize: "1rem" }}>
            <li>💇 <strong>Salon:</strong> Hair styling, grooming & skin care</li>
            <li>🏥 <strong>Healthcare:</strong> Checkups, wellness support, care</li>
          </ul>
          <Link 
  to="/about" 
  className="btn btn-dark px-4 py-2 fs-5 rounded-pill shadow-sm transition-all"
  style={{
    background: 'linear-gradient(45deg, #000000, #434343)',
    color: 'white',
    textDecoration: 'none'
  }}
>
  View More
</Link>


</div>
</div>






                <WhyChooseUs/>

        <Testimonial />
        <ContactUs />
      </div>
    </div>
  );
};

export default Services;
