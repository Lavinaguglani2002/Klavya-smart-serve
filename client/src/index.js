import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // No BrowserRouter here
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import UserContext from './components/UserContext';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserContext>
<App />
</UserContext>
);
