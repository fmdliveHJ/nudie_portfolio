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


const main = document.querySelectorAll('main');
const btns = document.querySelectorAll('.tab_list li');
const boxs = document.querySelectorAll('.panel li');
btns.forEach((el, index) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let isOn = e.currentTarget.classList.contains('on')
    if (isOn) return;
    activation(btns, index)
    activation(boxs, index)
  })
}) 

function activation(arr, index) {
  for (const btn of arr) {
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

next.addEventListener('click', e => {
  e.preventDefault();
  if (enableClick) {
    enableClick = false;
    nextSlide(slider, 500);
  }
})
prev.addEventListener('click', e => {
  e.preventDefault();
  if (enableClick) {
    enableClick = false;
    prevSlide(slider, 500);
  }
})

function nextSlide(frame, speed) {
  const ul = frame.querySelector('ul');
  new Anime(ul, {
    prop: 'left',
    value: '-200%',
    duration: speed,
    callback: () => {
      ul.append(ul.firstElementChild);
      ul.style.left = '-100%';
      enableClick = true;
    }
  })
}

function prevSlide(frame, speed) {
  const ul = frame.querySelector('ul');
  new Anime(ul, {
    prop: 'left',
    value: '0%',
    duration: speed,
    callback: () => {
      ul.prepend(ul.lastElementChild);
      ul.style.left = '-100%';
      enableClick = true;
    }
  })
}

function init(frame) {
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

//scroll motion
const header = document.querySelector('header');

window.addEventListener('scroll', (e) => {
  let scrollY = this.scrollY;
  let newArrival = document.querySelector('#new ul');
  let newTop = newArrival.getBoundingClientRect().top;
  let Sustainability = document.querySelector('#Sustainability .inner');
  let susTop = Sustainability.getBoundingClientRect().top;
  const base = 400

  console.log(Sustainability);
  console.log(susTop)

  if (scrollY > newTop) {
    newArrival.classList.add('on');
  } else {
    newArrival.classList.remove('on');
  }
  
  if (scrollY > susTop + base) {
    Sustainability.classList.add('on');
  } else {
    Sustainability.classList.remove('on');
  }

  //header
  if (scrollY > 0) {
    header.classList.add('on');
  } else {
    header.classList.remove('on');
  }

})

//scroll
const sections = document.querySelectorAll("section");
const ul = document.querySelector(".scroll_list");
const lis = document.querySelectorAll(".scroll_list li");
const lis_arr = Array.from(lis);
const len = sections.length;
let posArr = null;
let enableClick02 = true;
let base = -300;

setPos();

window.addEventListener("resize", () => {
  setPos();
  const active = ul.querySelector("li.on");
  const active_index = lis_arr.indexOf(active);
  window.scroll(0, posArr[active_index]);
})

lis.forEach((li, index) => {
  li.addEventListener("click", e => {
    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick02) {
      enableClick02 = false;
      moveScroll(index);
    }
  })
})

window.addEventListener("scroll", e => {
  ativation02();
})
function setPos() {
  posArr = [];
  for (let section of sections) {
    posArr.push(section.offsetTop)
  }
}

function moveScroll(index) {
  new Anime(window, {
    prop: "scroll",
    value: posArr[index],
    duration: 300,
    callback: () => {
      enableClick02 = true;
    }
  });
}

function ativation02() {
  let scroll = window.scrollY || window.pageYOffset;
  sections.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      for (const el of lis) el.classList.remove("on");
      lis[index].classList.add("on");
      for (const section of sections) section.classList.remove("on");
      sections[index].classList.add("on");
    }
  })
}

//swiper
// visual
let menu = ['Bake Your Own', 'Every pair of Nudie Jeans', 'Island Life']
let swiper = new Swiper(".visual_slider", {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 1000,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (menu[index]) + '</span>';
    },
  },
});
// Sustainability
let repair_swiper = new Swiper(".repair_slider", {
  speed: 1000,
  loop: true,
  pagination: {
    el: '.repair-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.repair-next',
    prevEl: '.repair-prev',
  },
});
// island
let island_swiper = new Swiper(".island_slider", {
  speed: 1000,
  loop: true,

  navigation: {
    nextEl: '.island-next',
    prevEl: '.island-prev',
  },
});

const skipNavi = document.querySelectorAll("#skipNavi li a"); 

for(let el of skipNavi){
    el.addEventListener("focusin", e=>{
        el.classList.add("on"); 
    });

    el.addEventListener("focusout", e=>{
        el.classList.remove("on"); 
    })
}

//cookie
const popup = document.querySelector('#popup');
const btnClose = document.querySelector('.close_btn');
const isCookie = document.cookie.indexOf('today=done');


if(isCookie == -1){
  console.log('쿠키없음')
  popup.style.display = 'block';
} else {
  console.log('쿠키 있음')
  popup.style.display = 'none';
}

btnClose.addEventListener('click', e=>{
  e.preventDefault();
  let isChecked = popup.querySelector('input[type=checkbox]').checked;
  if(isChecked){
    setCookie('today', 'done', 1);
  }
  popup.style.display ='none';
})
 function setCookie(cookieName, cookieValue, time){
     const today = new Date(); 
     const date = today.getDate(); 
     today.setDate(date+ time); 
     const duedate = today.toGMTString(); 
     document.cookie=`t${cookieName}=${cookieValue}; path="/"; expires=${duedate}`;  
 
 }