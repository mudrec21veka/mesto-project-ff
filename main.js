(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r,c){var p=e.querySelector(".card").cloneNode(!0),u=p.querySelector(".card__like-button"),d=p.querySelector(".card__delete-button"),a=p.querySelector(".card__image");return p.querySelector(".card__title").textContent=t,a.alt=t,a.src=n,d.addEventListener("click",o),u.addEventListener("click",r),a.addEventListener("click",c),p}function n(e){e.target.closest(".card").remove()}function o(e){e.target.closest(".card__like-button").classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",p),e.addEventListener("click",u)}function c(e){e.classList.remove("popup_is-opened","popup_is-animated"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){e.target===e.currentTarget&&c(e.currentTarget)}var d=document.querySelector(".places__list"),a=document.querySelector(".profile__edit-button"),i=document.querySelector(".profile__add-button"),l=document.querySelector(".popup_type_edit"),s=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_image"),m=document.querySelector(".popup__image"),y=document.querySelector(".popup__caption"),v=document.querySelector('.popup__form[name="new-place"]'),f=document.querySelector('.popup__form[name="edit-profile"]'),k=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),S=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url"),L=document.querySelector(".profile__title"),E=document.querySelector(".profile__description");function h(e){var t=e.target.closest(".card__image");r(_),m.src=t.src,m.alt=t.alt,y.textContent=t.alt}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){!function(e){d.append(e)}(t(e.name,e.link,n,o,h))})),a.addEventListener("click",(function(){k.value=L.textContent,q.value=E.textContent,r(l)})),i.addEventListener("click",(function(){r(s)})),v.addEventListener("submit",(function(e){e.preventDefault();var r=t(S.value,g.value,n,o,h);d.prepend(r),v.reset(),c(s)})),f.addEventListener("submit",(function(e){e.preventDefault(),L.textContent=k.value,E.textContent=q.value,c(l)})),document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return c(t)}))}));var x,b=document.querySelector(".popup__form").querySelector(".popup__input");b.addEventListener("input",(function(){b.validity.valid?b.classList.remove("popup__input_type_error"):b.classList.add("popup__input_type_error")})),x=document.querySelectorAll(".popup__form"),console.log(x)})();