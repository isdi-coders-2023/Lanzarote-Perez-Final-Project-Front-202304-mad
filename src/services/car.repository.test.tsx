import { CarRepository } from './car.repository';

describe('CarRepository', () => {
  let repository: CarRepository;
  const url = 'http://localhost:4400';

  beforeEach(() => {
    const token = '1';
    repository = new CarRepository(url, token);
  });

  test('query should fetch and return all sneakers', async () => {
    const cars = [
      { id: 1, name: 'Car 1' },
      { id: 2, name: 'Car 2' },
    ];
    const response = { items: cars };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(response),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4400/',
    });

    const result = await repository.query();

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(cars);
  });

  test('query should throw an error when fetch fails', async () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: 'http://localhost:4400/cars/',
    });

    await expect(repository.query()).rejects.toThrowError(
      `Error: ${errorResponse.status}. ${errorResponse.statusText}`
    );
    expect(global.fetch).toHaveBeenCalled();
  });

  test('register should create a new car', async () => {
    const carData = new FormData();
    carData.append('name', 'New Car');

    const createdCar = { id: 1, name: 'New Car' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(createdCar),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4400/car/create',
    });

    const result = await repository.register(carData);

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(createdCar);
  });

  test('patch should update an already existing car', async () => {
    const carData = { id: '1', name: 'New Car' };
    const createdCar = { id: '1', name: 'New Car' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(createdCar),
      headers: new Headers(),
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: 'http://localhost:4400/car/1',
    });

    const result = await repository.patch(carData);

    expect(global.fetch).toHaveBeenCalled();
    expect(result).toEqual(createdCar);
  });

  test('deleteById should update an already existing car', async () => {
    const id = '1';
    const expurl = 'http://localhost:4400car/delete/1';
    const token = '1';

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(id),
      // headers: new Headers(),
      // redirected: false,
      // status: 200,
      // statusText: 'OK',
      // type: 'basic',
      // url: 'http://localhost:4400/car/delete/1',
    });

    await repository.deleteById(id);

    expect(global.fetch).toHaveBeenCalledWith(expurl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  test('deleteById should throw an error if response is not ok', async () => {
    const id = '9';
    const error = new Error('Error HTTP: 404Not found');
    const url = 'http://localhost:4400car/delete/9';

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(id),
      status: 404,
      statusText: 'Not found',
    });

    await expect(repository.deleteById(id)).rejects.toThrow(error);

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer 1`,
      },
    });
  });
});
