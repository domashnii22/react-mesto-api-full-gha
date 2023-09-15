import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        required
        name="title"
        placeholder="Название"
        type="text"
        onChange={handleChange}
        value={values.title}
        isInputValid={isInputValid.title}
        error={errors.title}
        minLenght={2}
        maxLenght={30}
      ></Input>
      <Input
        required
        name="link"
        placeholder="Ссылка на картинку"
        type="url"
        onChange={handleChange}
        value={values.link}
        isInputValid={isInputValid.link}
        error={errors.link}
      ></Input>
    </PopupWithForm>
  );
}
