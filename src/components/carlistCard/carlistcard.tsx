import { Link } from 'react-router-dom';
import { Car } from '../../models/car';
import './carlistcard.scss';
import { useCars } from '../../hooks/use.cars';
import { GiCarKey } from 'react-icons/gi';
import { TbEngine } from 'react-icons/tb';
import { MdDateRange } from 'react-icons/md';
import { BsFillFuelPumpFill } from 'react-icons/bs';

type PropsType = {
  item: Car;
};
export function CarlistCard({ item }: PropsType) {
  const { handleDeleteCar } = useCars();

  const handleDelete = () => {
    handleDeleteCar(item.id);
    window.location.reload();
  };

  return (
    <div className="car_card_garage">
      <div
        className="car_card_image"
        key={item.carModel}
        style={{
          backgroundImage: `url(${item.carPhoto.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="car_card_actions">
          <button className="action">
            <Link to={'/editcar/' + item.id} key={item.id}>
              ED
            </Link>
          </button>
          <button className="action" onClick={handleDelete}>
            DEL
          </button>
        </div>
      </div>
      <div className="car_panel">
        <div className="car_card_info">
          <span>
            {' '}
            <GiCarKey /> {item.carBrand + ' ' + item.carModel}
          </span>
          <span>
            {' '}
            <MdDateRange /> {item.carYear}
          </span>
          <span>
            {' '}
            <TbEngine /> {item.carHP + ' CV'}
          </span>
          <span>
            <BsFillFuelPumpFill /> {item.carFuel}
          </span>
        </div>
      </div>
    </div>
  );
}
