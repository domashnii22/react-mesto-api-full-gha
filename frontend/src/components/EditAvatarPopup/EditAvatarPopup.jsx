// import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: values.avatar }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        // ref={input}
        required
        name="avatar"
        placeholder="Ссылка на аватар"
        type="url"
        onChange={handleChange}
        value={values.avatar}
        isInputValid={isInputValid.avatar}
        error={errors.avatar}
      ></Input>
    </PopupWithForm>
  );
}
