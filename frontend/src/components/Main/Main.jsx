import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../context/CurrentUserContext";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  onCardLike,
  cards,
  name,
  handleRegister,
  handleLogin,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      {
        {
          main: (
            <>
              <section className="profile">
                <button
                  aria-label="Кнопка редактирования аватара"
                  type="button"
                  className="profile__avatar-overlay"
                  onClick={onEditAvatar}
                >
                  <img
                    src={currentUser.avatar ? currentUser.avatar : "#"}
                    alt="Аватар пользователя"
                    className="profile__avatar"
                  />
                </button>
                <div className="profile__info">
                  <div className="profile__name-edit">
                    <h1 className="profile__name">
                      {currentUser.name ? currentUser.name : "#"}
                    </h1>
                    <button
                      aria-label="Кнопка редактирования имени и должности"
                      type="button"
                      className="profile__edit"
                      onClick={onEditProfile}
                    />
                  </div>
                  <p className="profile__occupation">
                    {currentUser.about ? currentUser.about : "#"}
                  </p>
                </div>
                <button
                  aria-label="Кнопка добавления данных"
                  type="button"
                  className="profile__add"
                  onClick={onAddPlace}
                />
              </section>
              <section className="places">
                <ul className="places__items">
                  {cards?.map((data) => {
                    return (
                      <li className="places__item" key={data._id}>
                        <Card
                          card={data}
                          onCardClick={onCardClick}
                          onCardLike={onCardLike}
                          onDelete={onDelete}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            </>
          ),
          signup: <Register name={name} handleRegister={handleRegister} />,
          signin: <Login name={name} handleLogin={handleLogin} />,
        }[name]
      }
    </main>
  );
}
