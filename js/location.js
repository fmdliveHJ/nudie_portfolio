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
timer = setInterval( move,50);

banner.addEventListener("mouseenter", ()=>{
    clearInterval(timer); 
});

banner.addEventListener("mouseleave", ()=>{
    timer = setInterval(move,50);
}); 

next.addEventListener("click", e=>{
    e.preventDefault(); 
    if(enableClick){
        nextEl();     
        enableClick = false; 
    }
}); 

prev.addEventListener("click", e=>{
    e.preventDefault(); 
    if(enableClick){
        prevEl();
        enableClick = false; 
    }
    
}); 

//동적으로 팝업 생성 
list.addEventListener("click", e=>{
    e.preventDefault(); 
    
    const imgSrc = e.target.parentElement.getAttribute("href"); 
    createPop(imgSrc); 
});



//동적으로 생성된 팝업이므로 
//이벤트 위임으로 팝업제거이벤트 처리 
document.body.addEventListener("click", e=>{
    removePop(e); 
    
}); 



//데이터 호출 함수 
function createList(url){
    fetch(url)
    .then(data=>{ 
        return data.json();   
    })
    .then(json=>{   
    
        let items = json.imgSrc; 
        console.log(items); 
    
        let tags =''; 
    
        items.forEach(item=>{
            tags+=`
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
    .catch(err=>{
        console.log("데이터를 호출하는데 실패했습니다!")
    })
}

//동적으로 생성된 ul 스타일 제어 함수 
function initList(){
    const list_li = list.querySelectorAll("li"); 
    const len = list_li.length; 
    wid = parseInt(getComputedStyle(list_li[0]).width); 
    list.style.width = len * wid +"px"; 
    list.style.marginLeft = -wid +"px";
    list.prepend(list.lastElementChild); 
}

//num값을 list의 margin-left에 적용하여 앞으로 이동하는 함수 
function move(){
    //list의 초기margin-left값 : -240
    //num값이 -480이 되면(list li하나가 앞으로 이동해서 화면에서 사라지면)
    if(num < -wid *2){
        //num값을 -240으로 고정하고 
        num = -wid; 
        //맨앞의 li를 list마지막으로 보냄 
        list.append(list.firstElementChild); 
    }else{
        //num값이초기값 -240에서 -480이 되기 전까지는 2씩 빼줌 
        num-=2; 
    }    
    //num값을 list margin-left에 적용 
    list.style.marginLeft = num +"px"; 
}

function nextEl(){
    new Anime(list,{
        prop:"margin-left", 
        value : -wid * 2, 
        duration: 500, 
        callback:()=>{
            list.append(list.firstElementChild); 
            list.style.marginLeft = -wid +"px"; 
            enableClick = true; 
        }
    })
}

function prevEl(){
    new Anime(list, {
        prop:"margin-left", 
        value : 0, 
        duration: 500, 
        callback:()=>{
            list.prepend(list.lastElementChild); 
            list.style.marginLeft = -wid +"px"; 
            enableClick = true; 
        }
    })
}

function createPop(imgSrc){
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
    new Anime(pop,{
        prop:"opacity", 
        value: 1, 
        duration:500
    })
}

function removePop(e){
    const pop = document.querySelector(".pop"); 
    //팝업이 생성된 상태라면 
    if(pop){
        //span태그를 찾아서 close에 저장 
        const close = pop.querySelector("span"); 
        //클릭한 요소가 close일때 팝업 remove
        if(e.target == close){
            //fadeOut효과 추가 
            new Anime(pop,{
                prop:"opacity", 
                value : 0, 
                duration:500, 
                callback:()=>{
                    document.querySelector(".pop").remove(); 
                }
            })
        } 
    }
}