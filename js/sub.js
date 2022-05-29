const btnCall = document.querySelector(".btnCall");
const close = document.querySelector(".close");
const menuMo = document.querySelector('.menuMo');
btnCall.onclick = (e) => {
  e.preventDefault();
  menuMo.classList.add('on');
}
close.onclick = (e) => {
  e.preventDefault();
  menuMo.classList.remove('on');

}

