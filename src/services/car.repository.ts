import { Car } from "../models/car";
import { ApiRepository } from "./api.repository";

type ApiResponse = {
  items: Car[];
};

export class CarRepository extends ApiRepository<Car> {
  constructor(public url: string, public token: string) {
    super(url);
  }

  async query(): Promise<Car[]> {
    const response = await fetch(this.url + "Car");
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return (await data).items;
  }

  async register(data: FormData): Promise<Car> {
    const response = await fetch(this.url + "car/create", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("store")}`,
      },
    });

    return response.json() as Promise<Car>;
  }

  async patch(data: Partial<Car>): Promise<Car> {
    const response = await fetch(this.url + "car/" + data.id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("store")}`,
      },
    });

    return response.json() as Promise<Car>;
  }

  async deleteById(id: Car["id"]) {
    const url = this.url + "car/delete/" + id;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!response.ok)
      throw new Error("Error HTTP: " + response.status + response.statusText);
  }
}
