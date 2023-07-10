import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  const url = 'localhost:4400/';
  describe('Query', () => {
    it('should fetch data from the API and return the response', async () => {
      const mockResponse = {
        items: [
          {
            id: 1,
            name: 'Juan Arquitecto',
            email: 'juanarquitecto@example.com',
          },
          {
            id: 2,
            name: 'Mamma Mia',
            email: 'mammamia@example.com',
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository(url);
      const response = await userRepository.query();

      expect(global.fetch).toHaveBeenCalledWith(url + 'user');
      expect(response).toEqual(mockResponse.items);
    });

    it('should throw an error if the fetch is not successful', async () => {
      const mockErrorMessage = 'Error';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Error',
      });

      const userRepository = new UserRepository(url);

      await expect(userRepository.query()).rejects.toThrow(mockErrorMessage);

      expect(global.fetch).toHaveBeenCalledWith(url + 'user');
    });
  });

  describe('filter', () => {
    const mockResponse = {
      items: [
        {
          id: 1,
          name: 'Juan Arquitecto',
          email: 'juanarquitecto@example.com',
        },
        {
          id: 2,
          name: 'Mamma Mia',
          email: 'mammamia@example.com',
        },
      ],
    };
    const mockFilter = '?location=Madrid';

    it('should throw an error if the fetch is not successful', async () => {
      const mockErrorMessage = 'Error';

      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Error',
      });

      const userRepository = new UserRepository(url);

      await expect(userRepository.filter(mockFilter)).rejects.toThrow(
        mockErrorMessage
      );

      expect(global.fetch).toHaveBeenCalledWith(url + 'user' + mockFilter);
    });

    it('should send a get request to the API and return the filtered response', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository(url);
      const response = await userRepository.filter(mockFilter);

      expect(global.fetch).toHaveBeenCalledWith(url + 'user' + mockFilter);
      expect(response).toEqual(mockResponse.items);
    });
  });

  describe('register', () => {
    it('should send a POST request to the API and return the response', async () => {
      const mockItem = {
        name: 'Juan Arquitecto',
        email: 'juanarquitecto@example.com',
        password: 'password',
      };
      const mockResponse = {
        id: 1,
        name: 'Juan Arquitecto',
        email: 'juanarquitecto@example.com',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository(url);
      const response = await userRepository.register(mockItem);

      expect(global.fetch).toHaveBeenCalledWith(url + 'user/register', {
        method: 'POST',
        body: JSON.stringify(mockItem),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response).toEqual(mockResponse);
    });
  });

  describe('login', () => {
    it('should send a PATCH request to the API and return the response', async () => {
      const mockItem = {
        email: 'juanarquitecto@example.com',
        password: 'password',
      };
      const mockResponse = {
        id: 1,
        name: 'Juan Arquitecto',
        email: 'juanarquitecto@example.com',
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userRepository = new UserRepository(url);
      const response = await userRepository.login(mockItem);

      expect(global.fetch).toHaveBeenCalledWith(url + 'user/login', {
        method: 'PATCH',
        body: JSON.stringify(mockItem),
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response).toEqual(mockResponse);
    });
  });
});
