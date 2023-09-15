import { useContext } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';

export default function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <article className='place'>
      {card.owner?._id === currentUser._id && (
        <button
          aria-label='Кнопка удаления карточки'
          type='button'
          className='place__trash-button'
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className='place__image'
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className='place__caption-block'>
        <h2 className='place__caption'>{card.name}</h2>
        <div className='place__heart-block'>
          <button
            aria-label='Кнопка для лайка'
            type='button'
            className={`place__heart ${isLiked ? 'place__heart_active' : ''}`}
            onClick={() => onCardLike(card, isLiked)}
          />
          <span className='place__heart-counter'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
