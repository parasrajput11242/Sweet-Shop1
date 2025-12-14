import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

test("shows login when user is not logged in", () => {
  localStorage.clear();

  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText(/login/i)).toBeInTheDocument();
});

test("shows logout when user is logged in", () => {
  localStorage.setItem("token", "fake-token");

  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});