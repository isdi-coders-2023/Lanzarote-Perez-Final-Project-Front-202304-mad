import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";
import { MemoryRouter } from "react-router-dom";
describe("Header component", () => {
  test("renders header with logo", () => {
    render(
      <MemoryRouter>
        <Header>
          <p>Test</p>
        </Header>
      </MemoryRouter>
    );

    const logoElement = screen.getByAltText("logo");

    expect(logoElement).toBeInTheDocument();
  });
});
