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
//scroll
const mediaCon = document.querySelectorAll('section > div');
const totalNum = mediaCon.length;

window.addEventListener("scroll", function (e) {
  const scroll = this.scrollY;
  for (let i = 0; i < totalNum; i++) {
    if (scroll > mediaCon[i].offsetTop - window.outerHeight / 2.5 && scroll < mediaCon[i].offsetTop - window.outerHeight / 2.5 + mediaCon[i].offsetHeight) {
      mediaCon[i].classList.add('on');
    } else {
      mediaCon[i].classList.remove('on');
    }
  }
})

