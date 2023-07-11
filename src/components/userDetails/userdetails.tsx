import { useParams } from 'react-router-dom';
import './userdetails.scss';
import { User } from '../../models/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Car } from '../../models/car';
import { HiIdentification, HiOutlineMail } from 'react-icons/hi';
import { GrLocation } from 'react-icons/gr';
import { AiOutlinePhone } from 'react-icons/ai';
import { TbEngine } from 'react-icons/tb';
import { GiCarKey } from 'react-icons/gi';
import { MdDateRange } from 'react-icons/md';
import { BsFillFuelPumpFill } from 'react-icons/bs';

export default function UserDetails() {
  const { id } = useParams();
  const { userList } = useSelector((state: RootState) => state.users);

  const user: User = userList.find((item: User) => item.id === id) as User;

  const checkIfTieso = () => {
    if (user.cars.length === 0) {
      return true;
    }
  };

  return (
    <div className={'loaded-route'}>
      <ul className={'user_details_card'}>
        <img
          className={'user_details_image'}
          src={user.avatar.imageUrl}
          alt="character-portrait"
        />
        <div className={'user_data'}>
          <div className={'user_properties'}>
            <li key="userName">
              <HiIdentification className="icon" />
              {user.userName}
            </li>
            <li key="location">
              <GrLocation className="icon" /> {user.location}
            </li>
            <li key="phoneNumber">
              <AiOutlinePhone className="icon" /> {user.phoneNumber}
            </li>
            <li key="email">
              <HiOutlineMail className="icon" /> {user.email}
            </li>
          </div>
        </div>
      </ul>

      {checkIfTieso() ? (
        <div className="message_container">
          <h3>This user doesn't have registered cars</h3>
        </div>
      ) : (
        user.cars?.map((item: Car) => (
          <>
            <div className="car_card" key={item.carModel}>
              <figure className="car_card_image_container">
                <img
                  className="car_image"
                  src={item.carPhoto.imageUrl}
                  alt={item.carModel}
                ></img>
              </figure>
              <div className="car_card_info">
                <span>
                  <GiCarKey /> {item.carBrand + ' ' + item.carModel}
                </span>
                <span>
                  <MdDateRange /> {item.carYear}
                </span>
                <span>
                  <TbEngine /> {item.carHP} CV
                </span>
                <span>
                  <BsFillFuelPumpFill /> {item.carFuel}
                </span>
              </div>
            </div>{' '}
          </>
        ))
      )}
    </div>
  );
}
