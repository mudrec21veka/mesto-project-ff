// Слушатели
function showInputError(input, config){                     // Функция, которая добавляет класс с ошибкой
  input.classList.add(config.inputErrorClass);
}

function hideInputError(input, config){                     // Функция, которая удаляет класс с ошибкой
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(input, config) {
  if (input.validity.valid) {
    hideInputError(input, config);
  } else {
    showInputError(input, config);
  }
}

function setEventListener(formElement, config) {
  const buttonElement = formElement.querySelector(config.buttonSelector);    //Кнопка которую будет затеменять
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));    //Все поля ввода инпут

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, config);
    });
  })
}

// Функции-обработчики

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach((formElement) => {
      setEventListener(formElement, config);
    });
}
