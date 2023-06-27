import { Character } from "../users/models/character";
import { ApiRepository } from "./api.repository";

describe("Given an ApiRepository", () => {
  describe("When it calls to the method getAll", () => {
    test("Then it should fetch data from the API and return the response", async () => {
      const expectedUrl = `https://rickandmortyapi.com/api/character`;
      const mockCharacters: Character[] = [
        {
          id: 1,
          name: "Homer Simpson",
          image: "homer.jpg",
          gender: "Masculino",
          status: "alive",
          species: "alien",
          url: "",
          next: "",
          prev: "",
        },
      ] as unknown as Character[];

      const mockResponse = {
        docs: mockCharacters,
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const repo = new ApiRepository(expectedUrl);
      const response = await repo.getAll(expectedUrl);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(response).toEqual(mockResponse);
    });

    test("Then it should throw an error if the fetch is not successful", async () => {
      const expectedUrl = `https://rickandmortyapi.com/api/character/randompage`;
      const mockErrorMessage = "Error";

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Error",
      });

      const repo = new ApiRepository(expectedUrl);

      expect(repo.getAll(expectedUrl)).rejects.toThrow(mockErrorMessage);

      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
    });

    // test("Then it should throw an error if the fetch is not successful", async () => {
    //   const filter = `alien`;

    //   global.fetch = jest.fn().mockResolvedValue({
    //     ok: false,
    //     status: 400,
    //     statusText: "Error",
    //   });

    //   const repo = new ApiRepository(filter);

    //   expect(repo.getFiltered(filter)).toHaveBeenCalled;
    // });
  });
});
