const frame = document.querySelector(".list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");
const key = "ac2a0a14b2c15e96b9b417eabf3b2694";
const base = "https://www.flickr.com/services/rest/?";
const photoGet = "flickr.people.getPublicPhotos";
const method_interest = "flickr.interestingness.getList";
const method_search = "flickr.photos.search";
const per_page = 50;


//이름으로 찾기 */
const method = "flickr.people.getPhotos";
const username = "195728709@N06";
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${username}`;
callData(url);

//검색 버튼 클릭시 callData호출 
btnSearch.addEventListener("click", e => {
  let tag = input.value.trim();
  //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지 
  if (tag) {
    //경고문구 있는 경우 지우고 데이터 호출 
    const errMsgs = input.parentElement.querySelectorAll("p");
    if (errMsgs.length > 0) errMsgs[0].remove();

    const url = `${base}method=${method_search}&api_key=${key}&user_id=${username}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

    callData(url);
    //입력한 검색어가 없을 경우 경고문구 생성
  } else {
    //전에 호출했던 데이터 지우기 

    frame.style.height = "auto";
    frame.innerHTML = `
    <li class="no_search"> 
    <p>
     No search results found
     </p>
     </li>
 `;
  frame.style.height = "auto";
  frame.style.transform = "none";
  }
});

input.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    let tag = input.value.trim(); //검색어문자열앞뒤의 공백제거
    console.log(tag)
    //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지 

    if (tag) {
      //경고문구 있는 경우 지우고 데이터 호출 
      const errMsgs = input.parentElement.querySelectorAll("p");
      if (errMsgs.length > 0) errMsgs[0].remove();

      const url = `${base}method=${method_search}&api_key=${key}&user_id=${username}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

      callData(url);

      //입력한 검색어가 없을 경우 경고문구 생성
    } else {
      frame.innerHTML = `
      <li class="no_search"> 
      <p>
       No search results found
       </p>
       </li>
   `;
    frame.style.height = "auto";
    frame.style.transform = "none";

    }
  }
})


//#list li클릭시 팝업 생성 
frame.addEventListener("click", e => {
  e.preventDefault();

  let target = e.target.parentElement.querySelector("img");

  if (e.target == target) {

    let imgSrc = target.parentElement.getAttribute("href");

    let pop = document.createElement("aside");
    pop.classList.add("pop");
    let pops = `
              <div class="con">
                  <img src=${imgSrc}/>
              </div>
              <span class="close">close</span>
        `;
    pop.innerHTML = pops;
    document.body.append(pop);
    document.body.style.overflow = "hidden";
  }

});


//팝업 닫기 버튼 클릭시 팝업 제거 
document.body.addEventListener("click", e => {
  let pop = document.querySelector(".pop");

  if (pop) {
    const close = pop.querySelector("span");

    if (e.target == close) {
      pop.remove();
      document.body.style.overflow = "auto";
    }
  }
})


function callData(url) {
  //스타일 초기화 
  loading.classList.remove("off");
  frame.classList.remove("on");

  //데이터 호출 
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      let items = json.photos.photo;
      console.log(items);

      if (items.length > 0) {
        //동적으로 태그 생성 
        createList(items);
        //이미지로딩완료후 isotope플러그인 적용
        imgLoaded();
      } else {
        frame.classList.remove("on");
        loading.classList.add("off");
        frame.innerHTML = `
               <li class="no_search"> 
               <p>
                No search results found
                </p>
                </li>
            `;
        frame.style.height = "auto";
        frame.style.transform = "none";
      }
    });
}

function createList(items) {
  let htmls = '';
  items.forEach(item => {
    let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
    let imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;
    let imgSrcBuddy = `http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`;
    htmls += `
      <li class="item">
          <div>
              <a href=${imgSrcBig} class="pic">
                  <img src=${imgSrc} />
              </a>
              <p>${item.title}</p>
              
          </div>
      </li>
        `;
  });

  frame.innerHTML = htmls;
}

function imgLoaded() {
  const thumb = document.querySelectorAll(".pic img");
  const len = thumb.length;
  let count = 0;


  thumb.forEach(img => {
    //이미지가 하나씩 로딩이 완료될때마다 count값 1씩 증가 
    img.onload = () => {
      count++;
      //모든 thumb이미지가 로딩되면 isotope 적용 
      if (count == len) isoLayout();
    }
    //썸네일 이미지 엑박시 대체이미지로 변경  
    img.onerror = () => {
      img.setAttribute("src", "img/default.jpg");
    }
  });
}

function isoLayout() {
  new Isotope(".list", {
    itemSelector: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s"
  });

  //모든 이미지 로딩완료후 모션처리 
  loading.classList.add("off");
  frame.classList.add("on");
}

//scroll
const galleryCon = document.querySelectorAll('section > div');
const totalNum = galleryCon.length;

window.addEventListener("scroll", function (e) {
  const scroll = this.scrollY;
  for (let i = 0; i < totalNum; i++) {
    if (scroll > galleryCon[i].offsetTop - window.outerHeight / 2.5 && scroll < galleryCon[i].offsetTop - window.outerHeight / 2.5 + galleryCon[i].offsetHeight) {
      galleryCon[i].classList.add('on');
    } else {
      galleryCon[i].classList.remove('on');
    }
  }
})

//gsap scroll
function animateFrom(elem, direction) {
  direction = direction || 1;
  let x = 0,
      y = direction * 100;
  if(elem.classList.contains("fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}
function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".show").forEach(function(elem) {
    hide(elem); 
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } 
    });
  });
});