export default function Form({
  name,
  onSubmit,
  children,
  isValid,
  titleButton,
}) {
  return (
    <form
      noValidate
      name={name}
      className={`${
        name === "signin" || name === "signup"
          ? "login__form"
          : `popup__form popup__form_type_${name}`
      }`}
      onSubmit={onSubmit}
    >
      {children}
      {
        {
          login: (
            <button
              type="submit"
              className={`login__button ${
                isValid ? "" : "login__button_invalid"
              }`}
            >
              {titleButton || "Регистрация"}
            </button>
          ),
          popup: (
            <button
              type="submit"
              className={`popup__save-button popup__save-button_type_${name} ${
                isValid ? "" : "popup__save-button_valid"
              }`}
            >
              {titleButton || "Сохранить"}
            </button>
          ),
        }[`${name === "signin" || name === "signup" ? "login" : "popup"}`]
      }
    </form>
  );
}
