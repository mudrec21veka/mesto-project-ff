import './pages/index.css';
import {initialCards} from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteFunction) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt, cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteFunction);
  return card;
}

function renderCard(data, conteiner){
  conteiner.append(createCard(data, deleteCard));
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteTarget = evt.target.closest('.card');
  deleteTarget.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) {
  renderCard(cardData, cardList);
});