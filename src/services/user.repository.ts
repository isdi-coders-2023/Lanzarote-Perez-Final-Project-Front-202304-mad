import { User } from '../models/user.js';
import { State } from '../redux/user.slice.js';
import { ApiRepository } from './api.repository.js';

type ApiResponse = {
  items: User[];
};

export class UserRepository extends ApiRepository<User> {
  constructor(public url: string) {
    super(url);
  }

  async query(): Promise<User[]> {
    const response = await fetch(this.url + 'user');
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async filter(filter: string): Promise<User[]> {
    const response = await fetch(this.url + 'user' + filter);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async register(data: FormData): Promise<User> {
    const response = await fetch(this.url + 'user/register', {
      method: 'POST',
      body: data,
    });

    return response.json() as Promise<User>;
  }

  async login(data: Partial<User>): Promise<State> {
    const response = await fetch(this.url + 'user/login', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = response.json();
    return result;
  }
}
