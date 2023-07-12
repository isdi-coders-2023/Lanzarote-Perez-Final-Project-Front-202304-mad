import { SyntheticEvent } from 'react';
import './login.scss';
import { useUsers } from '../../hooks/use.user';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const { handleLoginUser } = useUsers();
  const navigate = useNavigate();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { elements } = event.target! as HTMLFormElement;

    const data = {
      user: (elements.namedItem('user') as HTMLFormElement).value,
      password: (elements.namedItem('password') as HTMLFormElement).value,
    };

    const loginSuccess = await handleLoginUser(data);
    console.log(loginSuccess, 'login component');
    if (loginSuccess) {
      navigate('/home');
      Swal.fire({
        width: '20em',
        icon: 'success',
        title: 'LOGGED IN',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      navigate('/');
    }
    if (!loginSuccess) {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'SOMETHING WRONG, CHECK YOUR CREDENTIALS AND TRY AGAIN',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'white',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2000,
      });
      navigate('/login');
    }
  };

  return (
    <div className="loaded-route">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="title_form">LOGIN</h2>
        <input type="text" placeholder="Username / Email" name="user"></input>
        <input type="password" placeholder="Password" name="password"></input>
        <button type="submit" className="login_button_submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
