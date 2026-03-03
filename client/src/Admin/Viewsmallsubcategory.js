
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import "./viewsubcategory.css";

const Viewsmallsubcategory = () => {
  const navigate = useNavigate();
  const { categoryname, subcategoryname } = useParams();
  const [smallsubcategories, setSmallSubcategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartcount, setCartCount] = useState(0);
  const [priceRange, setPriceRange] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedSmallSubcategory, setSelectedSmallSubcategory] = useState("all");
  const [sortOption, setSortOption] = useState("none"); // For sorting

  const email = localStorage.getItem("EMAIL") || "guest";
  const role = localStorage.getItem("Role");

  useEffect(() => {
    if (role === "admin") {
      alert("Admins are not allowed to access this page.");
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/getsubsmallcategory/${categoryname}/${subcategoryname}`);
        setSmallSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categoryname, subcategoryname]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
    setCart(storedCart);
    setCartCount(storedCart.length);
  }, [email]);

  const handleAddToCart = (item) => {
    if (role === "admin") {
      alert("Admins cannot add items to the cart.");
      return;
    }

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.productId === item._id && cartItem.status === "pending"
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              price: (cartItem.quantity + 1) * item.price,
            }
          : cartItem
      );
    } else {
      updatedCart = [
        ...cart,
        {
          productId: item._id,
          userId: email,
          name: item.smallsubcategoryname,
          image: item.smallsubcategoryimage,
          price: item.price,
          quantity: 1,
          status: "pending",
        },
      ];
    }

    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem(`cart_${email}`, JSON.stringify(updatedCart));
    localStorage.setItem("cartcount", updatedCart.length);
    window.dispatchEvent(new Event("storage"));
    alert("Item added to cart!");
    navigate("/addtocart");
  };

  const getFilteredItems = () => {
    let filtered = [...smallsubcategories];

    // Price filter
    switch (priceRange) {
      case "100-1000":
        filtered = filtered.filter(item => item.price >= 100 && item.price <= 1000);
        break;
      case "1000-2000":
        filtered = filtered.filter(item => item.price > 1000 && item.price <= 2000);
        break;
      case "2000-3000":
        filtered = filtered.filter(item => item.price > 2000 && item.price <= 3000);
        break;
      case "3000-5000":
        filtered = filtered.filter(item => item.price > 3000 && item.price <= 5000);
        break;
      case "5000-10000":
        filtered = filtered.filter(item => item.price > 5000 && item.price <= 10000);
        break;
      default:
        break;
    }

    // Small subcategory name filter
    if (selectedSmallSubcategory !== "all") {
      filtered = filtered.filter(item => item.smallsubcategoryname === selectedSmallSubcategory);
    }

    // Search filter
    if (searchText.trim() !== "") {
      filtered = filtered.filter(item =>
        item.smallsubcategoryname.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Rating filter

    // Sorting
    if (sortOption === "priceAsc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAsc") {
      filtered = filtered.sort((a, b) => a.smallsubcategoryname.localeCompare(b.smallsubcategoryname));
    } else if (sortOption === "nameDesc") {
      filtered = filtered.sort((a, b) => b.smallsubcategoryname.localeCompare(a.smallsubcategoryname));
    }

    return filtered;
  };

  return (
    <div className="view-subcategory-wrapper container mt-4">
      <h2 className="text-center mb-4">{subcategoryname} Products</h2>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 mb-4">
          {/* Search */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Search</h5>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Price Filter */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Filter by Price</h5>
            <ul className="list-group">
              {[
                ["all", "All Prices"],
                ["100-1000", "₹100 - ₹1000"],
                ["1000-2000", "₹1000 - ₹2000"],
                ["2000-3000", "₹2000 - ₹3000"],
                ["3000-5000", "₹3000 - ₹5000"],
                ["5000-10000", "₹5000 - ₹10000"],
              ].map(([value, label]) => (
                <li
                  key={value}
                  className={`list-group-item ${priceRange === value ? "active" : ""}`}
                  onClick={() => setPriceRange(value)}
                  style={{ cursor: "pointer" }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Small Subcategory Filter */}
          <div className="card p-3 mb-4">
            <h5 className="mb-3">Filter by Type</h5>
            <select
              className="form-select"
              value={selectedSmallSubcategory}
              onChange={(e) => setSelectedSmallSubcategory(e.target.value)}
            >
              <option value="all">All Types</option>
              {[...new Set(smallsubcategories.map(item => item.smallsubcategoryname))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}

          {/* Sort Options */}
          <div className="card p-3">
            <h5 className="mb-3">Sort By</h5>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="none">None</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Products List */}
        <div className="col-md-9">
          <div className="row">
            {getFilteredItems().map((item) => (
              <div className="col-md-4 mb-4" key={item._id}>
                <div className="card">
                  <img
                    src={item.smallsubcategoryimage}
                    className="card-img-top"
                    alt={item.smallsubcategoryname}
                  />
                  <div className="card-body">
                    <h5>{item.smallsubcategoryname}</h5>
                    <p>Price: ₹{item.price}</p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {getFilteredItems().length === 0 && (
              <p className="text-center">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewsmallsubcategory;
