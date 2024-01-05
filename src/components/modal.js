export {openPopup, closePopup }; 
 
function openPopup (popup){ 
  popup.classList.add('popup_is-opened', 'popup_is-animated');  
  document.addEventListener('keydown', closeByEsc); 
  popup.addEventListener('click', closeByOverlay); 
}
 
function closePopup(popup) { 
  popup.classList.remove('popup_is-opened', 'popup_is-animated'); 
  document.removeEventListener('keydown', closeByEsc); 
} 
 
function closeByEsc (event) { 
  if (event.key === 'Escape') { 
    const popup = document.querySelector('.popup_is-opened'); 
    closePopup(popup); 
  } 
} 
 
function closeByOverlay (event) { 
  if (event.target === event.currentTarget) { 
    const popup = event.currentTarget; 
    closePopup(popup); 
  } 
} 
 
