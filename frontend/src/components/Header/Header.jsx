import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";

export default function Header({ name, dataUser }) {
  function onSignOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <img src={logo} alt="Лого проекта в шапке" className="header__logo" />
      {name === "signup" || name === "signin" ? (
        <Link
          to={name === "signup" ? "/sign-in" : "/sign-up"}
          className="header__link"
        >
          {name !== "signup" ? "Регистрация" : "Войти"}
        </Link>
      ) : (
        <>
          <div className="header__container">
            <p className="header__email">{dataUser}</p>
            <Link
              to={"/sign-in"}
              className="header__unlogin"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
