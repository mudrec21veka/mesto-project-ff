//Функция открытия popup
function openPopup (popup){ 
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', closeByEsc); 
}
 //Функция закрытия popup
function closePopup(popup) { 
  popup.classList.remove('popup_is-opened', 'popup_is-animated'); 
  document.removeEventListener('keydown', closeByEsc); 
} 
//Функция закрытия popup по Esc
function closeByEsc (event) { 
  if (event.key === 'Escape') { 
    const openPopup = document.querySelector('.popup_is-opened'); 
    closePopup(openPopup); 
  } 
}

export {openPopup, closePopup}; 
 