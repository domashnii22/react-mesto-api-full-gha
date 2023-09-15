import Form from "../Form/Form";
import { Link } from "react-router-dom";

export default function SectionLogin({ name, onSubmit, children, isValid }) {
  return (
    <section className="login">
      <h2 className="login__title">
        {name === "signup" ? "Регистрация" : "Вход"}
      </h2>
      <Form
        name={name}
        onSubmit={onSubmit}
        children={children}
        isValid={isValid}
        titleButton={name === "signup" ? "Зарегистрироваться" : "Войти"}
      />
      {name === "signup" && (
        <p className="login__subtitle">
          Уже зарегистрированы?{" "}
          <Link to={"/sign-in"} className="login__subtitle-link">
            Войти
          </Link>
        </p>
      )}
    </section>
  );
}
