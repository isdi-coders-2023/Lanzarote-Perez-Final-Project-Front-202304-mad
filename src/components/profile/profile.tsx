import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';
import './profile.scss';

export function Profile() {
  const { userData } = useSelector((state: RootState) => state.users);

  return (
    <div className="loaded-route">
      <div className="profile_card" key={userData.id}>
        <div className="profile_info">
          <span className="profile_card_title"> {userData.userName}</span>
          <figure className="profile_image">
            <img
              src={userData.avatar?.imageUrl}
              width={'200'}
              alt={userData.userName}
            ></img>
          </figure>
          <span>
            <GrLocation className="icon" /> {userData.location}
          </span>
          <span>
            <AiOutlinePhone className="icon" /> {userData.phoneNumber}
          </span>

          <span>
            <HiOutlineMail className="icon" /> {userData.email}
          </span>
        </div>
      </div>
    </div>
  );
}
