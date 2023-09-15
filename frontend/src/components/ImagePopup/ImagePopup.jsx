export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__block" onClick={(evt) => evt.stopPropagation()}>
        <button
          aria-label="Кнопка закрытия попапа"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          src={card.link}
          alt={`Изображение ${card.name}`}
          className="popup__image"
        />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  );
}
