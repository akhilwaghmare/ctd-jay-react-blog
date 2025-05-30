import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/create" element={<CreatePostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
