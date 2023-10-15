// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(num, arr) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = arr[num].link;
  cardElement.querySelector(".card__image").alt = arr[num].name;
  cardElement.querySelector(".card__title").textContent = arr[num].name;

  cardList.append(cardElement);
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });
}

// @todo: Функция удаления карточки
function deleteCard(object) {
  object.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < (arr = initialCards).length; i++) {
  createCard(i, arr);
}