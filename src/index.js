import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getInitialInfo, updateUserInfo, postNewCard, updateUserAvatar} from './components/api.js';

//Переменная id пользователя
let userId;

//Получение списка карточек
const cardList = document.querySelector('.places__list');

//Получение модальных окон
const popupProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_avatar');

//Получение кнопок сохранение данных окон
const buttonSavePopupProfile = popupProfile.querySelector('.popup__button');
const buttonSavePopupAddCard = popupAddCard.querySelector('.popup__button');
const buttonSavePopupAvatar = popupAvatar.querySelector('.popup__button');

//Получение данных формы редактирования профиля
const formEditProfile = document.querySelector('[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput  = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popupAvatarForm = document.forms["edit-avatar"];

//Получение данных формы создания карточки
const formNewPlace = document.querySelector('[name = "new-place"]');
const nameCard = document.querySelector('[name = "place-name"]');
const linkCard  = document.querySelector('[name = "link"]');

//Получение данных формы увеличения карточки
const popupImage = popupCard.querySelector('.popup__image');
const popupCaption = popupCard.querySelector('.popup__caption');

//Получение кнопок открытия popup
const avatarEditButton = document.querySelector(".profile__image-container");
const buttonPopupProfile = document.querySelector('.profile__edit-button');
const buttonPopupAddCard = document.querySelector('.profile__add-button');

//Объект данных для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//Открытие и редактирование popup изменения аватара
avatarEditButton.addEventListener('click', (evt) => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openPopup(popupAvatar);
});
function handleAvatarFormSubmit(evt) {
  buttonSavePopupAvatar.textContent = buttonSavePopupAvatar.getAttribute('data-loading');
  evt.preventDefault();
  updateUserAvatar(popupAvatarForm.link.value)
   .then((updatedProfile) => {
    fillProfileInfo(updatedProfile);
  closePopup(popupAvatar);
})
  .catch((err) => {console.log(err);})
  .finally(() => {buttonSavePopupAvatar.textContent = buttonSavePopupAvatar.getAttribute('data-default-text');
});
}
popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit)

//Редактирование профиля
buttonPopupProfile.addEventListener('click', function() {
  clearValidation(popupProfile, validationConfig);
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
function handleFormSubmit(evt) {
  buttonSavePopupProfile.textContent = buttonSavePopupProfile.getAttribute('data-loading');
  evt.preventDefault(); 
  updateUserInfo({  
    name: nameInput.value,
    about: jobInput.value,
  })
  .then((updatedProfile) => {
    fillProfileInfo(updatedProfile);
  closePopup(popupProfile);
})
  .catch((err) => {console.log(err);})
  .finally(() => {buttonSavePopupProfile.textContent = buttonSavePopupProfile.getAttribute('data-default-text');
  });
};
formEditProfile.addEventListener('submit', handleFormSubmit);

//Добавление карточки
buttonPopupAddCard.addEventListener('click', function() {
  clearValidation(popupAddCard, validationConfig);
  openPopup(popupAddCard);
});
function addNewCard(evt) {
  buttonSavePopupAddCard.textContent = buttonSavePopupAddCard.getAttribute('data-loading');
  evt.preventDefault();
  const item = {name: nameCard.value, link: linkCard.value};
  postNewCard(item)
  .then((card) => {
    const newCard = createCard(card, userId, deleteCard, likeCard, openCard);
    cardList.prepend(newCard);
  nameCard.value = '';
  linkCard.value = '';
  closePopup(popupAddCard);
  })
  .catch((err) => {console.log(err);})
  .finally(() => {buttonSavePopupAddCard.textContent = buttonSavePopupAddCard.getAttribute('data-default-text');
  })
};
formNewPlace.addEventListener('submit', addNewCard);

//Увеличение карточки
function openCard(itemLink, itemName) {
  openPopup(popupCard);
  popupImage.src = itemLink;
  popupImage.alt = itemName;
  popupCaption.textContent = itemName;
}

//Закрытие карточки по клику на крестик и оверлей
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
  buttonsPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(buttonsPopup);
    };
  });
});

//Вызов валидации
enableValidation(validationConfig);

//API
getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);})
  .catch((err) => {console.log(err);});

//Получаем данные пользователя
const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

//Вывод карточек на экран
function renderInitialCards(initialCards, userId) {
  initialCards.forEach(item => {
    cardList.append(createCard(item, userId, deleteCard, likeCard, openCard));
  });
}