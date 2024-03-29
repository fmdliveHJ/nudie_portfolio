//mobile menu
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

//about slider
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
  //header
  if (scrollY > 0) {
    header.classList.add('on');
  } else {
    header.classList.remove('on');
  }
})

//scroll
const sectionCon = document.querySelectorAll('section');
const totalNum = sectionCon.length;

window.addEventListener("scroll", function (e) {
  const scroll = this.scrollY;
  for (let i = 0; i < totalNum; i++) {
    if (scroll > sectionCon[i].offsetTop - window.outerHeight / 3 && scroll < sectionCon[i].offsetTop - window.outerHeight / 3 + sectionCon[i].offsetHeight) {
      sectionCon[i].classList.add('on');
    } else {
      sectionCon[i].classList.remove('on');
    }
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
 //gsap scroll

 gsap.from('#about', {
  duration:0.5,
  y:100,

  scrollTrigger: {
    trigger : '#about',
    marker: true,
    toggleActions:'toggle',
    scrub: 0.5
  }
})

 gsap.from('#sns', {
  duration:1,
  y:100,
  scale:0.8,
  scrollTrigger: {
    trigger : '#sns',
    toggleActions:'toggle',
    scrub: 0.5
  }
})

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
let repair_swiper = new Swiper(".Sustainability_slider", {
  speed: 1000,
  loop: true,
  pagination: {
    el: '.Sus-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.Sus-next',
    prevEl: '.Sus-prev',
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

//popup 
//h1을 클릭했을 때 
//선그어지는 효과 - 박스 - inner 보이게 처리
const body = document.querySelector("body"); 
const repair_open = document.querySelector(".repair_open"); 
const repairPop = document.querySelector("#repairPopup"); 
const repair_close = document.querySelector(".repair_close"); 
const _top = repairPop.querySelector(".top");
const _inner =repairPop.querySelector(".inner");
const repairSpeed = 500; 

repair_open.addEventListener("click", e=>{
    e.preventDefault(); 
    body.classList.add('hidden')
    repair_close.style.display  = "block";
    repairPop.style.display = "block"; 
    repairPop.style.zIndex  = 10;

    new Anime(_top,{
        prop:"width", 
        value:"100%", 
        duration : repairSpeed, 
        callback:()=>{
          new Anime(_inner,{
              prop:"opacity", 
              value:1, 
              duration : repairSpeed, 
               
          })
      } 
    })
}); 

repair_close.addEventListener("click", e=>{
    e.preventDefault(); 
    body.classList.remove('hidden')
    new Anime(_inner,{
        prop:"opacity", 
        value:0, 
        duration:repairSpeed, 
        callback:()=>{
            new Anime(_top,{
                prop:"width", 
                value:"0%", 
                duration:repairSpeed,
                callback:()=>{
                  repairPop.style.display = "none";
                   
                }
            });
        }

    })
})
