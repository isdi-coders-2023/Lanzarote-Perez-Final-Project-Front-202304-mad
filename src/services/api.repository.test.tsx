import { ApiRepository } from './api.repository';

describe('ApiRepository', () => {
  let repository: ApiRepository<any>;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getAll should fetch data from the correct URL and return the JSON response', async () => {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    const url = 'http://example.com/items';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(data),
    });
    repository = new ApiRepository(url);

    const result = await repository.getAll(url);

    expect(fetchMock).toHaveBeenCalledWith(url);
    expect(result).toEqual(data);
  });

  test('getAll should throw an error if the response is not OK', async () => {
    const url = 'http://example.com/items';
    const errorMessage = 'Error: 404. Not Found';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    repository = new ApiRepository(url);

    await expect(repository.getAll(url)).rejects.toThrow(errorMessage);
    expect(fetchMock).toHaveBeenCalled();
  });

  test('getFiltered should fetch data from the correct URL and return the JSON response', async () => {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    const mockFilter = '?location=Madrid';
    const url = 'http://example.com/items';
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(data),
    });
    repository = new ApiRepository(url);

    const result = await repository.getFiltered(mockFilter);

    expect(fetchMock).toHaveBeenCalledWith(url + mockFilter);
    expect(result).toEqual(data);
  });

  test('getFiltered should throw an error if the response is not ok', async () => {
    const mockFilter = '?gdgdgd=Madrid';
    const url = 'http://example.com/items';
    const errorMessage = 'Error: 404. Not Found';
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    repository = new ApiRepository(url);

    await expect(repository.getFiltered(mockFilter)).rejects.toThrow(
      errorMessage
    );
    expect(fetchMock).toHaveBeenCalled;
  });

  test('get should fetch data for a specific item from the correct URL and return the JSON response', async () => {
    const itemId = 1;
    const item = { id: 1, name: 'Item 1' };
    const url = 'http://example.com/items/' + itemId;
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(item),
    });
    repository = new ApiRepository(url);

    const result = await repository.get(itemId);

    expect(fetchMock).toHaveBeenCalled();
    expect(result).toEqual(item);
  });
});
