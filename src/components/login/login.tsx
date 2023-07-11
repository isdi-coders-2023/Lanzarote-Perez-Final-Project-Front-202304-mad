import { SyntheticEvent } from 'react';
import './login.scss';
import { useUsers } from '../../hooks/use.user';

export default function Login() {
  const { handleLoginUser } = useUsers();

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { elements } = event.target! as HTMLFormElement;

    const data = {
      user: (elements.namedItem('user') as HTMLFormElement).value,
      password: (elements.namedItem('password') as HTMLFormElement).value,
    };

    await handleLoginUser(data);
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
