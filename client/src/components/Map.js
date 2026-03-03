// import React, { useState } from "react";
// import axios from "axios";

// const LocationSearch = () => {
//   const [query, setQuery] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");

//   const handleSearch = async (e) => {
//     setQuery(e.target.value);
//     if (e.target.value.length < 3) return; // Minimum 3 characters

//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
//       );
//       setLocations(response.data);
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Search Location</h2>
//       <input
//         type="text"
//         placeholder="Enter a location..."
//         value={query}
//         onChange={handleSearch}
//         style={styles.input}
//       />
//       {locations.length > 0 && (
//         <ul style={styles.list}>
//           {locations.map((loc, index) => (

//             key={index}
//               style={styles.listItem}
//               onClick={() => {
//                 setSelectedLocation(loc.display_name);
//                 setQuery("");
//                 setLocations([]);
//               }}
//             >
//               {loc.display_name}
//             </li>
//           ))}
//         </ul>
//       )}
//       {selectedLocation && <p style={styles.selected}>📍 {selectedLocation}</p>}
//     </div>
//   );
// };

// // 🔹 CSS Styling
// const styles = {
//   container: {
//     width: "300px",
//     margin: "20px auto",
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//   },
//   heading: {
//     fontSize: "20px",
//     marginBottom: "10px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     fontSize: "16px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//     margin: 0,
//     background: "#fff",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     maxHeight: "200px",
//     overflowY: "auto",
//     position: "absolute",
//     width: "280px",
//   },
//   listItem: {
//     padding: "10px",
//     cursor: "pointer",
//     borderBottom: "1px solid #eee",
//   },
//   selected: {
//     marginTop: "10px",
//     fontWeight: "bold",
//   },
// };

// export default LocationSearch;
