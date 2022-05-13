const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector('.menuMo'); 

btnCall.onclick = (e)=>{
    e.preventDefault(); 

    btnCall.classList.toggle('on'); 
    menuMo.classList.toggle('on'); 
}