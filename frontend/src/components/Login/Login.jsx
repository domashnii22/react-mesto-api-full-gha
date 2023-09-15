/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";

export default function Login({ name, handleLogin }) {
  const { values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();

  function onLogin(evt) {
    evt.preventDefault();
    handleLogin(values.password, values.email);
  }

  return (
    <>
      <SectionLogin name={name} onSubmit={onLogin} isValid={isValid}>
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
          minLenght={2}
          onChange={handleChange}
          value={values.password}
          isInputValid={isInputValid.password}
          error={errors.password}
        ></Input>
      </SectionLogin>
    </>
  );
}
