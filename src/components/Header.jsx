import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [reactStars, setReactStars] = useState(null);

  const fetchReactStars = async () => {
    try {
      const res = await fetch("https://api.github.com/repos/facebook/react", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Error fetching repo stars");
      }
      const data = await res.json();
      setReactStars(data["stargazers_count"]);
    } catch (error) {
      console.log("Error occured: ", error.message);
    }
  };

  useEffect(() => {
    fetchReactStars();
  }, []);

  return (
    <header className={styles.header}>
      <div>
        <h1>My React Blog</h1>
        {reactStars && <p>Github stars: {reactStars}</p>}
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/create">Create</Link>
      </nav>
    </header>
  );
};

export default Header;
