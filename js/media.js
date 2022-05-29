/*
키값 :AIzaSyBRM5pMfszFmLafdsii9bicZeVa5yWIeqs
playlist: PLooTX0MOEe6MoofFH0t5afF8357gr7xxm
*/
const key = "AIzaSyBRM5pMfszFmLafdsii9bicZeVa5yWIeqs";
const playlistId = "PLooTX0MOEe6MoofFH0t5afF8357gr7xxm";
const vidCon = document.querySelector('.vid_con');
const num = 9;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

createList(url);
//이벤트 위임 - 썸네일을 클릭했을 때 
vidCon.addEventListener("click", e => createPop(e));
document.body.addEventListener("click", e => closePop(e));
function createList(url) {
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      let items = json.items;
      console.log(items);
      let result = '';
      items.map(item => {

        let title = item.snippet.title;
        if (title.length > 20) title = title.substr(0, 20) + "...";

        let desc = item.snippet.description;
        if (desc.length > 50) desc = desc.substr(0, 50) + "...";

        let date = item.snippet.publishedAt;
        date = date.split("T")[0];
        result += `
          <article>
              <a href="#" data-vid="${item.snippet.resourceId.videoId}" class="pic">
                  <img src="${item.snippet.thumbnails.high.url}"/>
                  <i></i>
              </a>
              <div class="con">
                  <h2>${title}</h2>
                  <p>${desc}</p>
                  <span>${date}</span>
              </div>
          </article>
            `;
      });

      vidCon.innerHTML = result;
    });
}

function createPop(e) {
  e.preventDefault();
  //a태그의 속성값을 받아야 하므로 
  //클릭한 요소의 부모태그가 a가 아니라면 중지
  if (!e.target.closest("a")) return;
  const vidId = e.target.parentElement.getAttribute("data-vid");

  let pop = document.createElement("figure");
  pop.classList.add("pop");
  pop.innerHTML = `
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}" frameborder="0" allowfullscreen></iframe>
    <span class="btnClose">close</span>
    `;

  document.body.append(pop);
}

function closePop(e) {
  const pop = document.querySelector(".pop");
  if (pop) {
    const close = pop.querySelector(".btnClose");
    if (e.target == close) pop.remove();
  }
}



  const visual = document.querySelector(".visual");
  const media = document.querySelector(".media_info");
  const youtubeCon = document.querySelector(".youtube_con");
  const banner = document.querySelector(".banner");

  const visualTop = visual.getBoundingClientRect().top;
  const mediaTop = media.getBoundingClientRect().top;
  const youtubeTop = youtubeCon.getBoundingClientRect().top;
  const bannerTop = banner.getBoundingClientRect().top;

  console.log(mediaTop)

function showValue() {
let scroll = window.scrollY||window.pageYOffset ; 

console.log(scroll)
  if(mediaTop <= scroll){
    media.classList.add('on')
  }
  else {
    media.classList.remove('on')
  }

  if(youtubeTop <= scroll){
    youtubeCon.classList.add('on')
  }
  else {
    youtubeCon.classList.remove('on')
  }

  if(bannerTop <= scroll){
    banner.classList.add('on')
  }
  else {
    banner.classList.remove('on')
  }



}



window.addEventListener('scroll' , function() {
  showValue();
});

window.addEventListener('resize' , function() {
  showValue();
});

