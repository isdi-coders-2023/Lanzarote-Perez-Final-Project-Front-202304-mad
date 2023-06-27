import { AppRoutes } from "./app.routes";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router";
import { AppContext } from "../../../context/app.context";
import "@testing-library/jest-dom";
import { ContextStructure } from "../../../context/app.context";

const mockContext: ContextStructure = {
  characterContext: {
    character: [
      {
        url: "localhost/",
        id: 1,
        name: "wow",
        img: "img",
      },
    ],
  },
} as unknown as ContextStructure;

describe("Given the App routes component", () => {
  describe("When you render the different paths", () => {
    test("Then it should render", async () => {
      render(
        <Router initialEntries={["/"]} initialIndex={0}>
          <AppContext.Provider value={mockContext}>
            <AppRoutes></AppRoutes>
          </AppContext.Provider>
        </Router>
      );
      const elements = await screen.findByText("wow");

      expect(elements).toBeInTheDocument();
    });
  });
});
