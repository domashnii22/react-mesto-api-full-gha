import React from "react";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";

export default function Register({ name, handleRegister }) {
  const { values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();

  function onRegister(evt) {
    evt.preventDefault();
    handleRegister(values.password, values.email);
  }

  return (
    <>
      <SectionLogin name={name} onSubmit={onRegister} isValid={isValid}>
        <Input
          required
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
        ></Input>
        <Input
          required
          name="password"
          placeholder="Пароль"
          type="password"
          minLenght={3}
          onChange={handleChange}
          value={values.password}
          isInputValid={isInputValid.password}
          error={errors.password}
        ></Input>
      </SectionLogin>
    </>
  );
}
