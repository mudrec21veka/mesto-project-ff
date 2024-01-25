import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';


const cardList = document.querySelector('.places__list');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');
const formElementProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function addCard(item) {
  cardList.append(item);
}

initialCards.forEach((item) => {
  const cardData = createCard(
    item.name,
    item.link,
    deleteCard,
    likeCard,
    openCardImage
  );
  addCard(cardData);
});

function openCardImage(event) {
  const cardImage = event.target.closest('.card__image');
  openPopup (popupTypeImage);
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
}

buttonOpenEditProfilePopup.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit)
});
buttonOpenAddCardPopup.addEventListener('click', function() {openPopup(popupAdd)});
formElementNewPlace.addEventListener('submit', submitAddCardForm);
formElementProfile.addEventListener('submit', submitEditProfileForm);


function submitEditProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

function submitAddCardForm(event) {
  event.preventDefault();
  const title = placeNameInput.value;
  const image = linkInput.value;
  const cardData = createCard(
    title,
    image,
    deleteCard,
    likeCard,
    openCardImage
  );

  cardList.prepend(cardData);
  formElementNewPlace.reset();
  closePopup(popupAdd);
}

document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});





import { enableValidation } from './components/validate.js';

const formConfiguration = {
  formSelector: '.popup__form',
  buttonSelector: '.popup__button',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
};



enableValidation(formConfiguration);