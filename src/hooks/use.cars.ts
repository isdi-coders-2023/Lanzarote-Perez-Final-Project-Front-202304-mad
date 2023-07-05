import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useCallback, useMemo } from "react";

import { Car } from "../models/car";
import { CarRepository } from "../services/car.repository";
import {
  editCarAsync,
  loadCarsAsync,
  registerCarAsync,
} from "../redux/car.slice";

export function useCars() {
  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:4400/";
  const repo: CarRepository = useMemo(() => new CarRepository(url), []);

  const handleLoadCars = useCallback(async () => {
    dispatch(loadCarsAsync(repo));
  }, [repo, dispatch]);

  const handleNewCar = async (data: FormData) => {
    dispatch(registerCarAsync({ repo, data }));
  };

  const handleEditCar = async (data: Partial<Car>) => {
    dispatch(editCarAsync({ repo, data }));
  };

  return {
    handleLoadCars,
    handleNewCar,
    handleEditCar,
  };
}
