import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AddItem from './Components/Add Item';
import About from './Components/About';
import Product from './Components/New Product'; 

function App() {
  // 1. Navigation State
  const [activePage, setActivePage] = useState("home");

  // 2. Data State
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("expenseData");
    return saved ? JSON.parse(saved) : [];
  });

  // --- NEW STATE: For Day 1 Task Backend Message ---
  const [backendMessage, setBackendMessage] = useState("Connecting to Backend...");

  // --- NEW EFFECT: Fetch Data from Backend (Phase 2) ---
  useEffect(() => {
    fetch('http://localhost:3000/api/day1')
      .then(response => response.json())
      .then(data => {
        console.log("Data received:", data);
        setBackendMessage(data.message); // Should display "Backend Working!"
      })
      .catch(error => {
        console.error("Error connecting:", error);
        setBackendMessage("Error: Is Backend running on port 3000?");
      });
  }, []);

  // 3. Save to Local Storage
  useEffect(() => {
    localStorage.setItem("expenseData", JSON.stringify(items));
  }, [items]);

  // --- Handlers ---
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Delete all items?')) {
      setItems([]);
    }
  };

  // --- Render Section ---
  const renderSection = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      
      case "project":
        return (
          <AddItem 
            items={items} 
            onAdd={handleAddItem} 
            onDelete={handleDeleteItem} 
            onClear={handleClearAll}
          />
        );
      
      case "product":
        return <Product />;

      case "about":
        return <About />;
      
      default:
        return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNavbar onNavClick={setActivePage} />

      {/* --- ADDED SECTION FOR DAY 1 TASK SCREENSHOT --- */}
      {/* This blue box will show the backend message at the top */}
      <div className="container mt-3">
        <div className="alert alert-primary text-center" role="alert">
          <strong>Day 1 Task Output:</strong> {backendMessage}
        </div>
      </div>
      {/* ----------------------------------------------- */}

      <main className="flex-grow-1">
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
}

export default App;