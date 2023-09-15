export default function Input({
  name,
  type,
  placeholder,
  minLenght,
  maxLenght,
  isInputValid,
  value,
  onChange,
  error,
}) {
  return (
    <>
      {name === "password" || name === "email" ? (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLenght ? minLenght : " "}
            maxLength={maxLenght ? maxLenght : " "}
            required
            className={`login__input ${
              isInputValid === undefined || isInputValid
                ? ""
                : "login__input_invalid"
            }`}
            onChange={onChange}
            value={value ? value : ""}
          />
          <span className="login__error">{error}</span>
        </>
      ) : (
        <>
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            minLength={minLenght ? minLenght : " "}
            maxLength={maxLenght ? maxLenght : " "}
            required
            className={`popup__input ${
              isInputValid === undefined || isInputValid
                ? ""
                : "popup__input_error"
            }`}
            onChange={onChange}
            value={value ? value : ""}
          />
          <span className="popup__input-error">{error}</span>
        </>
      )}
    </>
  );
}
