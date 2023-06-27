import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AppContext, ContextStructure } from "../../../context/app.context";
import { MemoryRouter as Router } from "react-router-dom";
import Home from "./home";
import { Character } from "../../../users/models/character";

describe("Given character details component", () => {
  const MockCharacters = [
    {
      url: "",
      id: 1,
      name: "Oh yeah",
      image: "",
      next: "",
      prev: "",
      gender: "",
      status: "",
      species: "",
    },
  ] as Character[];

  const value: ContextStructure = {
    characterContext: {
      character: MockCharacters,
    },
  } as unknown as ContextStructure;

  test("renders Home with character cards", () => {
    render(
      <>
        <Router>
          <AppContext.Provider value={value}>
            <Home></Home>
          </AppContext.Provider>
        </Router>
      </>
    );

    const characterDetails = screen.getByText("Oh yeah");
    expect(characterDetails).toBeInTheDocument();
  });
});
