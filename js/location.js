//loaction
let mapContainer = document.getElementById('map');   
const branch_btns = document.querySelectorAll(".map_list li"); 

let mapOption = { 
        center: new kakao.maps.LatLng(37.5121, 127.0997), 
        level: 4 
    };
let map = new kakao.maps.Map(mapContainer, mapOption); 

let drag = true; 
let zoom = true; 

 let markerOptions = [
     {
         title:"본점", 
         latlng:new kakao.maps.LatLng(37.5121, 127.0997), 
         imgSrc:"img/location/marker1.png", 
         imgSize:new kakao.maps.Size(52, 60),
         imgPos : {offset: new kakao.maps.Point(-80 ,100 )},
         button: branch_btns[0] 
     }, 
     {
        title:"지점1", 
        latlng:new kakao.maps.LatLng(37.6616, 126.772), 
        imgSrc:"img/location/marker1.png", 
        imgSize:new kakao.maps.Size(52, 60),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button:branch_btns[1] 
    }, 
    {
        title:"지점2", 
        latlng:new kakao.maps.LatLng(37.2659, 127.0004), 
        imgSrc:"img/location/marker1.png", 
        imgSize:new kakao.maps.Size(52, 60),
        imgPos : {offset: new kakao.maps.Point(116, 99)},
        button:branch_btns[2] 
    }
 ]; 

 for(let i=0; i<markerOptions.length; i++){
    let marker = new kakao.maps.Marker({
        map: map, 
        position: markerOptions[i].latlng,  
        title : markerOptions[i].title,  
        image : new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)  
    });


    markerOptions[i].button.addEventListener("click", e=>{
        e.preventDefault(); 
        for(let branch of branch_btns){
            branch.classList.remove("on"); 
        }
        markerOptions[i].button.classList.add("on"); 
        moveTo(markerOptions[i].latlng)
    })
 }
 

window.addEventListener("resize",()=>{    
    let active = document.querySelector(".map_list li.on"); 

    const branch = Array.from(branch_btns); 
    let active_index = branch.indexOf(active); 

    map.setCenter(markerOptions[active_index].latlng);
}); 
 

let mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);


let zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


setDraggable(drag); 
function setDraggable(draggable) {
    map.setDraggable(draggable);    
}

setZoomable(zoom); 
function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
} 

function moveTo(target) {                
    let moveLatLon = target;    
    map.setCenter(moveLatLon);
}

//롤링배너 
const banner = document.querySelector(".banner");
const list = banner.querySelector(".list");
const prev = banner.querySelector(".prev");
const next = banner.querySelector(".next");
let num = -240;
let wid = 0;
let timer = null;
let enableClick = true;

//fectch구문으로 데이터 호출 
createList("data.json");
//move함수 0.05초마다 호출- 앞으로 이동 모션 
timer = setInterval(move, 50);

banner.addEventListener("mouseenter", () => {
  clearInterval(timer);
});

banner.addEventListener("mouseleave", () => {
  timer = setInterval(move, 50);
});

next.addEventListener("click", e => {
  e.preventDefault();
  if (enableClick) {
    nextEl();
    enableClick = false;
  }
});
prev.addEventListener("click", e => {
  e.preventDefault();
  if (enableClick) {
    prevEl();
    enableClick = false;
  }
});
//동적으로 팝업 생성 
list.addEventListener("click", e => {
  e.preventDefault();

  const imgSrc = e.target.parentElement.getAttribute("href");
  createPop(imgSrc);
});

//동적으로 생성된 팝업이므로 
//이벤트 위임으로 팝업제거이벤트 처리 
document.body.addEventListener("click", e => {
  removePop(e);
});

//데이터 호출 함수 
function createList(url) {
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      let items = json.imgSrc;
      console.log(items);
      let tags = '';
      items.forEach(item => {
        tags += `
              <li>
                  <a href=${item.pic}>
                      <img src=${item.thumb}>
                  </a>
              </li>
            `;
      });
      list.innerHTML = tags;
      initList();
    })
    .catch(err => {
      console.log("데이터를 호출하는데 실패했습니다!")
    })
}

//동적으로 생성된 ul 스타일 제어 함수 
function initList() {
  const list_li = list.querySelectorAll("li");
  const len = list_li.length;
  wid = parseInt(getComputedStyle(list_li[0]).width);
  list.style.width = len * wid + "px";
  list.style.marginLeft = -wid + "px";
  list.prepend(list.lastElementChild);
}

//num값을 list의 margin-left에 적용하여 앞으로 이동하는 함수 
function move() {
  //list의 초기margin-left값 : -240
  //num값이 -480이 되면(list li하나가 앞으로 이동해서 화면에서 사라지면)
  if (num < -wid * 2) {
    //num값을 -240으로 고정하고 
    num = -wid;
    //맨앞의 li를 list마지막으로 보냄 
    list.append(list.firstElementChild);
  } else {
    //num값이초기값 -240에서 -480이 되기 전까지는 2씩 빼줌 
    num -= 2;
  }
  //num값을 list margin-left에 적용 
  list.style.marginLeft = num + "px";
}

function nextEl() {
  new Anime(list, {
    prop: "margin-left",
    value: -wid * 2,
    duration: 500,
    callback: () => {
      list.append(list.firstElementChild);
      list.style.marginLeft = -wid + "px";
      enableClick = true;
    }
  })
}

function prevEl() {
  new Anime(list, {
    prop: "margin-left",
    value: 0,
    duration: 500,
    callback: () => {
      list.prepend(list.lastElementChild);
      list.style.marginLeft = -wid + "px";
      enableClick = true;
    }
  })
}

function createPop(imgSrc) {
  const pop = document.createElement("aside");
  pop.classList.add("pop");
  pop.innerHTML = `
                <div class="pic">
                    <img src=${imgSrc}>
                </div>
                <span>CLOSE</span>
    `;

  document.body.append(pop);
  //fadeIn효과 추가 
  new Anime(pop, {
    prop: "opacity",
    value: 1,
    duration: 500
  })
}

function removePop(e) {
  const pop = document.querySelector(".pop");
  //팝업이 생성된 상태라면 
  if (pop) {
    //span태그를 찾아서 close에 저장 
    const close = pop.querySelector("span");
    //클릭한 요소가 close일때 팝업 remove
    if (e.target == close) {
      //fadeOut효과 추가 
      new Anime(pop, {
        prop: "opacity",
        value: 0,
        duration: 500,
        callback: () => {
          document.querySelector(".pop").remove();
        }
      })
    }
  }
}


