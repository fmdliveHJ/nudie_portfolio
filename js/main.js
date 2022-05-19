const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector('.menuMo'); 
btnCall.onclick = (e)=>{
    e.preventDefault(); 
    btnCall.classList.toggle('on'); 
    menuMo.classList.toggle('on'); 
}


const main = document.querySelectorAll('main');
const btns = document.querySelectorAll('.tab_list li');
const boxs = document.querySelectorAll('.panel li');
btns.forEach((el, index)=> {
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    let isOn = e.currentTarget.classList.contains('on')
    //만약 활성화 되어 있다면 아래코드 실행안하고 이벤트문 종료
    if(isOn) return;
      activation(btns, index)
      activation(boxs, index)
  })
})
function activation(arr, index){
  //클릭한 버튼에 on이 있어서 이미 활성화 되어 있는지 isOn에 저장
  for(const btn of arr){
    btn.classList.remove('on');
  }
  arr[index].classList.add('on');

}

const slider = document.querySelector('.text_con');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let enableClick = true;
let speed = 300;
init(slider);

next.addEventListener('click', e=> {
  e.preventDefault();
  if(enableClick){
    enableClick = false;
    nextSlide(slider, 500);
  }
})
prev.addEventListener('click', e=> {
  e.preventDefault();
  if(enableClick){
    enableClick = false;
    prevSlide(slider, 500);
  }
})

function nextSlide(frame, speed){
  const ul = frame.querySelector('ul');
  new Anime(ul, {
    prop: 'left',
    value: '-200%',
    duration: speed,
    callback:() =>{
      ul.append(ul.firstElementChild);
      ul.style.left = '-100%';
      enableClick = true;
    }
  })
}
function prevSlide(frame, speed){
const ul = frame.querySelector('ul');
  new Anime(ul, {
    prop: 'left',
    value: '0%',
    duration: speed,
    callback:() =>{
      ul.prepend(ul.lastElementChild);
      ul.style.left = '-100%';
      enableClick = true;
    }
  })
}

function init(frame){
  const ul = frame.querySelector('ul');
  const lis = ul.querySelectorAll('li');
  const len = lis.length;
  
  ul.style.left = '-100%';
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100 * len}%`
  lis.forEach((li) => {
    li.style.width = `${100 / len}%`
  })
}

//new
let newArrival = document.querySelector('#new ul');
const header = document.querySelector('header');

window.addEventListener('scroll', (e)=> {
  let value = window.scrollY;
 // console.log('scroll', value);
  if(value > 700){
    newArrival.classList.add('on');
   
  }else {
    newArrival.classList.remove('on');
    
  }
  if(value > 860){
    header.classList.add('on');
  }else {
    header.classList.remove('on');  
  }
  


})

