import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import ArticleList from "../components/ArticleList";

describe("Test health check", () => {
  it("1 plus 1 equals 2", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("App suite", () => {
  it("contains header", () => {
    render(<App />);
    expect(screen.getByText("My React Blog")).toBeInTheDocument();
  });
});

describe("Article list suite", () => {
  const testArticles = [];

  it("empty state", () => {
    render(<ArticleList articles={testArticles} />);
    expect(screen.getByText("No articles")).toBeInTheDocument();
  });
});
