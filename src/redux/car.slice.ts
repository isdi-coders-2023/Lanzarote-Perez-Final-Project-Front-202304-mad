import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Car } from "../models/car";
import { CarRepository } from "../services/car.repository";

export type carPhoto = {
  urlOriginal: string;
  url: string;
  mimetype: string;
  size: number;
};

export type State = {
  carList: Car[];
  carData: Partial<Car>;
  token?: string;
};

const initialState: State = {
  carList: [],
  token: "",
  carData: {} as Partial<Car>,
};

export const loadCarsAsync = createAsyncThunk(
  "cars/load",
  async (repo: CarRepository) => {
    const response = await repo.query();
    return response;
  }
);

export const registerCarAsync = createAsyncThunk<
  Car,
  { repo: CarRepository; data: FormData }
>("cars/register", async ({ repo, data }) => {
  return await repo.register(data);
});

export const deleteCarAsync = createAsyncThunk<
  string,
  { repo: CarRepository; id: string }
>("cars/deleteByID", async ({ id, repo }, thunkAPI) => {
  try {
    await repo.deleteById(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue("ID not found");
  }
});

export const editCarAsync = createAsyncThunk<
  Car,
  { repo: CarRepository; data: Partial<Car> }
>("cars/edit", async ({ repo, data }) => {
  return await repo.patch(data);
});

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCarsAsync.fulfilled, (state, { payload }) => ({
      ...state,
      carList: payload,
    }));
    builder.addCase(registerCarAsync.fulfilled, (state, { payload }) => ({
      ...state,
      cars: payload,
    }));
    builder.addCase(editCarAsync.fulfilled, (state, { payload }) => ({
      ...state,
      cars: payload,
    }));
  },
});

export default carsSlice.reducer;
