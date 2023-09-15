import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import Input from "../Input/Input";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isValid,
    isInputValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("occupation", currentUser.about);
  }, [currentUser, setValue]);

  function resetForClose() {
    onClose();
    reset({ name: currentUser.name, occupation: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: values.name, occupation: values.occupation }, reset);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <Input
        required
        name="name"
        placeholder="Имя"
        type="text"
        onChange={handleChange}
        value={values.name}
        isInputValid={isInputValid.name}
        error={errors.name}
        minLength={2}
        maxLength={40}
      ></Input>
      <Input
        required
        name="occupation"
        placeholder="Должность"
        type="text"
        onChange={handleChange}
        value={values.occupation}
        isInputValid={isInputValid.occupation}
        error={errors.occupation}
        minLength={2}
        maxLength={200}
      ></Input>
    </PopupWithForm>
  );
}
