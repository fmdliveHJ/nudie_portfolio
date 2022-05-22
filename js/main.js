const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector('.menuMo');
btnCall.onclick = (e) => {
  e.preventDefault();
  btnCall.classList.toggle('on');
  menuMo.classList.toggle('on');
}

const main = document.querySelectorAll('main');
const btns = document.querySelectorAll('.tab_list li');
const boxs = document.querySelectorAll('.panel li');
btns.forEach((el, index) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    let isOn = e.currentTarget.classList.contains('on')
    //만약 활성화 되어 있다면 아래코드 실행안하고 이벤트문 종료
    if (isOn) return;
    activation(btns, index)
    activation(boxs, index)
  })
})

function activation(arr, index) {
  //클릭한 버튼에 on이 있어서 이미 활성화 되어 있는지 isOn에 저장
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

//new
let newArrival = document.querySelector('#new ul');
const header = document.querySelector('header');

window.addEventListener('scroll', (e) => {
  let value = window.scrollY;
  // console.log('scroll', value);
  if (value > 700) {
    newArrival.classList.add('on');

  } else {
    newArrival.classList.remove('on');

  }
  if (value > 120) {
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
let base = -400;

//console.log(lis_arr); 

//브라우저 로딩시 섹션 세로위치값 구하기 
setPos();



window.addEventListener("resize", () => {
  setPos();
  //resize시 버튼과 섹션 매칭이 안되는 문제 
  //현재 활성화 버튼의 순번구하기 
  //브라우저를 활성화섹션의 위치로 고정해서 이동 
  const active = ul.querySelector("li.on");
  const active_index = lis_arr.indexOf(active);
  //console.log(active_index); 
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

//브라우저 스크롤시 현재의 스코롤 거리값 출력 
window.addEventListener("scroll", e => {
  ativation02();
})

function setPos() {
  posArr = [];
  //각섹션 세로위치값 구해서 저장 
  for (let section of sections) {
    posArr.push(section.offsetTop)
  }
  //console.log(posArr)
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
    //스크롤값이 각 섹션의 세로 위치값보다 크거나 같다면 
    if (scroll >= posArr[index] + base) {
      //모든 버튼을 비활성화하고  
      for (const el of lis) el.classList.remove("on");
      //해당 순번의 li만 활성화 
      lis[index].classList.add("on");
      //모든 섹션의 on을 제거하고 
      for (const section of sections) section.classList.remove("on");
      //해당 순번의 section만 활성화 
      sections[index].classList.add("on");
    }
  })
}

//swiper
// visual
let menu = ['Bake Your Own', 'Every pair of Nudie Jeans', 'Island Life']
let swiper = new Swiper(".visual_slider", {
  autoplay: {
    delay: 3000,
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