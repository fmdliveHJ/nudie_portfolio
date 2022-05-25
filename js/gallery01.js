/*
key : e348bed2bd80ff66c01682c0c396ac50

메소드
https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.interestingness.getList

이미지 경로 
https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg


버디 아이콘
http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
https://www.flickr.com/images/buddyicon.gif
*/

const frame = document.querySelector('.list');
const loading  =document.querySelector('.loading');
const key = "e348bed2bd80ff66c01682c0c396ac50";
const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const per_page = 50;
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;


callData(url);
frame.addEventListener("click", e => createPop(e));

function callData(url) {
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      let items = json.photos.photo;
      console.log(items);

      createList(items)
      delayLoad();

   

    })
}

function createList(items) {
  let htmls = '';
  items.forEach(item => {
    let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`
    let imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`

    htmls += `
        <li class="item">
          <div>
            <a href="${imgSrcBig}" class="pic">
            <img src="${imgSrc}" />
            </a>
            <p>${item.title}</p>
            <span class="profile">
              <img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg" />
              <strong>${item.owner}</strong>
            </span>
          </div>
        </li>
      `;
  })
  frame.innerHTML = htmls;
}

function delayLoad(){
  const thumb = document.querySelectorAll(".pic img");

  const len = imgs.length;
  //이미지 하나가 로딩될때마다 카운트를 증가시킴
  let count = 0;

  for (let el of imgs){
    el.onload = () => {
      count ++;
      if( count == len) {
        isoLayout();
      }
    }
  }
  

  thumb.forEach(img => {
    img.onerror = () => {
      img.setAttribute("src", "img/ico/dummy.jpg");
    }
  })



  //버디 이미지
  const buddy = document.querySelectorAll(".profile img");
  buddy.forEach(imgs => {
    imgs.onerror = () => {
      imgs.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    }
  })
}

function isoLayout (){
  new Isotope(".list", {
    itemSelector: '.item',
    columnWidth: '.item',
    transition: "0.5"
  });
  //모든이미지 로딩 완료후 
  loading.classList.add('off');
  frame.classList.add('on')
}

function createPop(e) {
  e.preventDefault();
  //a태그의 속성값을 받아야 하므로 
  //클릭한 요소의 부모태그가 a가 아니라면 중지
  if (!e.target.closest("a")) return;
  const vidId = e.target.parentElement.getAttribute("data-vid");


  let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`

  let pop = document.createElement("figure");
  pop.classList.add("pop");
  pop.innerHTML = `
   <img src="${imgSrc}">
    <span class="btnClose">close</span>
    `;

  document.body.append(pop);
}