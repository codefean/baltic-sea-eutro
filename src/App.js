// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import RouteMap from "./pages/routeMap";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.css";

// Custom hook for setting the document title
const useDocumentTitle = (title) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};

const RouteMapPage = () => {
  useDocumentTitle("Baltic Sea Eutrophication");

  React.useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return <RouteMap />;
};

const AboutPage = () => {
  useDocumentTitle("About");
  return <About />;
};

// -------------------------------------------
// Layout component that can hide the footer
// -------------------------------------------
const Layout = () => {
  const location = useLocation();

  // Paths where footer should be hidden
  const hideFooter = ["/", "/route-map", "/Map", "/CLD"].includes(location.pathname);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<RouteMapPage />} />
          <Route path="/route-map" element={<RouteMapPage />} />
          <Route path="/Map" element={<RouteMapPage />} />
          <Route path="/CLD" element={<AboutPage />} />
          <Route path="*" element={<RouteMapPage />} />
        </Routes>
      </main>

      {/* Hide footer on map pages */}
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
