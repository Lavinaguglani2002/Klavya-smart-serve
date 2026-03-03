import React from "react";
import { Button } from "@mui/material";
import { styled } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.min.css';

const WhyChooseUs = () => {
  const CustomButton = styled(Button)({
    background: 'linear-gradient(45deg, #FF8E53 0%, #FF6A00 100%)',
    color: 'white',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '50px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF6A00 0%, #FF8E53 100%)',
      boxShadow: '0 6px 30px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(1)',
    },
  });

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        
        {/* Left Column - GIF */}


        <div className="col-lg-6 text-center mb-4 mb-lg-0">

        <img
  src="https://media.giphy.com/media/jTnGoce9UeYDE/giphy.gif"
  alt="Happy Customers"
  className="img-fluid rounded shadow"
/>

</div>


        {/* Right Column - Text & Features */}
        <div className="col-lg-6">
          <h2 className="mb-4 fw-bold">
            Discover Why We're the Best Choice for Your Needs
          </h2>
          <p className="mb-4">
            Thousands of satisfied customers trust our services every day. Here’s why we’re your perfect choice for a hassle-free experience.
          </p>

          <div className="row">
            {[
              { title: "24/7 Support", desc: "Always available to help you anytime." },
              { title: "Verified Experts", desc: "Background-checked and trained staff." },
              { title: "Affordable Rates", desc: "Top quality with best pricing." },
              { title: "Quick Booking", desc: "Book any service in just clicks." }
            ].map((item, index) => (
              <div className="col-6 mb-4" key={index}>
                <div className="bg-light p-3 rounded shadow-sm h-100">
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <CustomButton variant="contained">Explore Now</CustomButton>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
