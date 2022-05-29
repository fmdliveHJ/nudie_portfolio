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


/*
//이름으로 찾기 */
const method = "flickr.people.getPhotos"; 
const username = "195728709@N06";
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&user_id=${username}`; 
callData(url); 

//검색 버튼 클릭시 callData호출 
btnSearch.addEventListener("click", e=>{
    let tag = input.value.trim(); 

    //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지 

    if(tag){
        //경고문구 있는 경우 지우고 데이터 호출 
        const errMsgs = input.parentElement.querySelectorAll("p"); 
        if(errMsgs.length >0) errMsgs[0].remove(); 

        const url = `${base}method=${method_search}&api_key=${key}&user_id=${username}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
    
        callData(url);

    //입력한 검색어가 없을 경우 경고문구 생성
    }else{
        //전에 호출했던 데이터 지우기 
        frame.innerHTML =""; 
        frame.style.height = "auto"; 

        const errMsgs = input.parentElement.querySelectorAll("p"); 
        if(errMsgs.length >0) errMsgs[0].remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("Enter search terms"); 
        input.parentElement.append(errMsg); 
    }   
});


input.addEventListener("keyup", e=>{
    if(e.key === "Enter"){
        let tag = input.value.trim(); //검색어문자열앞뒤의 공백제거
        console.log(tag)
        //if(!tag) return; //검색어 입력없이 버튼 클릭시 아래 코드를 실행하지 않고 중지 

        if(tag){
            //경고문구 있는 경우 지우고 데이터 호출 
            const errMsgs = input.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) errMsgs[0].remove(); 

            const url = `${base}method=${method_search}&api_key=${key}&user_id=${username}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
        
            callData(url);           

        //입력한 검색어가 없을 경우 경고문구 생성
        }else{
            frame.innerHTML = "No search results found"; 
            frame.style.height = "auto"; 

            const errMsgs = input.parentElement.querySelectorAll("p"); 
            if(errMsgs.length >0) errMsgs[0].remove(); 

            const errMsg = document.createElement("p"); 
            errMsg.append("검색어를 입력하세요"); 
            input.parentElement.append(errMsg); 
        }
    }
})


//#list li클릭시 팝업 생성 
frame.addEventListener("click", e=>{
    e.preventDefault(); 

    let target = e.target.parentElement.querySelector("img"); 
    
    if(e.target == target){
         
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
document.body.addEventListener("click", e=>{
    let pop = document.querySelector(".pop"); 

    if(pop){
        const close = pop.querySelector("span"); 

        if(e.target == close){
            pop.remove(); 
            document.body.style.overflow = "auto"; 
        }
    }
})


function callData(url){
    //스타일 초기화 
    loading.classList.remove("off"); 
    frame.classList.remove("on"); 

    //데이터 호출 
    fetch(url)
    .then(data=>{
        return data.json(); 
    })
    .then(json=>{
        let items = json.photos.photo; 
        console.log(items); 

        if(items.length >0){
            //동적으로 태그 생성 
            createList(items); 
            //이미지로딩완료후 isotope플러그인 적용 ㄴ
            imgLoaded(); 
        }else{
           // console.log("검색하신 검색어의 이미지가 없습니다"); 

            const errMsg = document.createElement("p"); 
            errMsg.append("No search results found"); 
            input.parentElement.append(errMsg); 

            frame.classList.remove("on");
            loading.classList.add("off"); 
            frame.innerHTML =`
               <li class="no_search"> 
               <p>
                No search results foundz
                </p>
                </li>
            `; 
            frame.style.height = "auto"; 
        }

         
    }); 
}

function createList(items){
    let htmls = ''; 
    items.forEach(item=>{
        let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
        let imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`; 
        let imgSrcBuddy = `http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`;
        htmls+=`
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

function imgLoaded(){
    const thumb = document.querySelectorAll(".pic img"); 
    const len = thumb.length; 
    let count = 0; 
    
           
    thumb.forEach(img =>{
        //이미지가 하나씩 로딩이 완료될때마다 count값 1씩 증가 
        img.onload =()=>{
            count++; 
            //모든 thumb이미지가 로딩되면 isotope 적용 
            if(count == len ) isoLayout(); 
        }
        //썸네일 이미지 엑박시 대체이미지로 변경  
        img.onerror=()=>{
            img.setAttribute("src", "img/default.jpg");
        }
    }); 

    //버디아이콘 엑박시 대체이미지로 변경 
    const buddies = document.querySelectorAll(".profile img"); 
    buddies.forEach(buddy=>{
        buddy.onerror=()=>{
           buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
            
        }
    })
}

function isoLayout(){
    new Isotope(".list",{
        itemSelector:".item", 
        columnWidth:".item", 
        transitionDuration:"0.5s"
    }); 

    //모든 이미지 로딩완료후 모션처리 
    loading.classList.add("off"); 
    frame.classList.add("on"); 
}