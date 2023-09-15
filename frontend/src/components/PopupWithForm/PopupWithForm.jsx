import Form from "../Form/Form";

export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          aria-label="Кнопка закрытия попапа"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <Form
          name={name}
          onSubmit={onSubmit}
          children={children}
          isValid={isValid}
          titleButton={titleButton}
        />
      </div>
    </div>
  );
}
