import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeName } from '../../config';

import './Header.scss';
import Swal from 'sweetalert2';
import { RootState } from '../../redux/store';

export function Header({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { token, userData } = useSelector((state: RootState) => state.users);

  const handleUser = () => {
    if (token) {
      localStorage.removeItem(storeName);
      navigate('/');
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'LOGGED OUT',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      navigate('/');
      window.location.reload();
    } else {
      navigate('login');
    }
  };

  const handleRegister = () => {
    navigate('register');
  };

  return (
    <>
      <header className="title">
        <div className="title_name">
          <h1>SRC</h1>
        </div>
        <div className="title_info">
          {token ? (
            <>
              <div className="user_info">
                <span className="user_name">{userData?.userName}</span>
                <button
                  onClick={handleUser}
                  role="button"
                  name="logout"
                  className="logout_button"
                >
                  Logout
                </button>
              </div>
              <figure className="image_container">
                <img
                  src={userData.avatar?.imageUrl}
                  height={'50px'}
                  width={'50px'}
                ></img>
              </figure>
            </>
          ) : (
            <>
              <div className="user_info user_buttons">
                <button
                  onClick={handleRegister}
                  role="button"
                  name="Register"
                  className="register_button"
                >
                  Register
                </button>
                <button
                  onClick={handleUser}
                  role="button"
                  className="login_button"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      {children}
    </>
  );
}
