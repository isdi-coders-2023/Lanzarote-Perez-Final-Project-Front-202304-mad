import "./register.scss";

export default function Register() {
  return (
    <div className="loaded-route">
      <form className="register-form">
        <h2 className="title_form">REGISTER</h2>
        <input type="text" placeholder="Username / Email" name="user"></input>
        <input type="password" placeholder="Password" name="password"></input>
        <button type="submit" className="login_button">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
