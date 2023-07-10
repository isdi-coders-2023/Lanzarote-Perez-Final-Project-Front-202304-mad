import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useCallback, useMemo } from 'react';

import { Car } from '../models/car';
import { CarRepository } from '../services/car.repository';
import {
  deleteCarAsync,
  editCarAsync,
  loadCarsAsync,
  registerCarAsync,
} from '../redux/car.slice';
import Swal from 'sweetalert2';
import { url } from '../config';

export function useCars() {
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.users);
  const repo: CarRepository = useMemo(
    () => new CarRepository(url, token as string),
    []
  );

  const handleLoadCars = useCallback(async () => {
    dispatch(loadCarsAsync(repo));
  }, [repo, dispatch]);

  const handleNewCar = async (data: FormData) => {
    try {
      dispatch(registerCarAsync({ repo, data }));
      console.log('Succesfully registered car');
      return Swal.fire({
        icon: 'success',
        text: 'Succesfully Registered!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Error submitting your new car, please try again',
      });
    }
  };

  const handleEditCar = async (data: Partial<Car>) => {
    try {
      dispatch(editCarAsync({ repo, data }));
      return Swal.fire({
        icon: 'success',
        iconColor: 'red',
        confirmButtonColor: 'red',
        timer: 1500,
        color: 'black',
        text: 'Succesfully Registered a new car!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Error deleting car',
      });
    }
  };

  const handleDeleteCar = (id: string) => {
    try {
      dispatch(deleteCarAsync({ id, repo: repo }));
      return Swal.fire({
        icon: 'success',
        text: 'Succesfully Registered!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Error deleting car',
      });
    }
  };

  return {
    handleDeleteCar,
    handleLoadCars,
    handleNewCar,
    handleEditCar,
  };
}
