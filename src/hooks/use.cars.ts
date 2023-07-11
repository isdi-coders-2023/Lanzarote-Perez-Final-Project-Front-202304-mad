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
      await dispatch(registerCarAsync({ repo, data }));
      return Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'SUCCESFULLY REGISTERED CAR',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    } catch (error) {
      return Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'ERROR REGISTERING CAR' + { error },
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    }
  };

  const handleEditCar = async (data: Partial<Car>) => {
    try {
      await dispatch(editCarAsync({ repo, data }));
      return Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'SUCCESFULLY UPDATED CAR',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'ERROR UPDATING CAR',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    }
  };

  const handleDeleteCar = async (id: string) => {
    try {
      await dispatch(deleteCarAsync({ id, repo: repo }));
      return Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'SUCCESFULLY DELETED CAR',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
    } catch (error) {
      return Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'ERROR DELETING CAR',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
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
