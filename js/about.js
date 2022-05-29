
const is_about = document.querySelector(".is_about");
const about_with = document.querySelector(".about_with");
const withArticle = about_with.querySelectorAll("article");
const Organization = document.querySelector(".Organization");

const isTop = is_about.getBoundingClientRect().top;
const withTop = about_with.getBoundingClientRect().top;
const orTop = Organization.getBoundingClientRect().top;

console.log(isTop)

function showValue() {
let scroll = window.scrollY||window.pageYOffset ; 
console.log(scroll)
if(isTop <= scroll){
  is_about.classList.add('on')
}
else {
  is_about.classList.remove('on')
}

// withArticle.forEach((el, index) => {
//   el.addEventListener('scroll', (e) => {
//     e.preventDefault();
//   e.currentTarget.classList.add('on')
//   })
// })

// if(about_with <= scroll){
//   withTop.classList.add('on')
// }
// else {
//   withTop.classList.remove('on')
// }


// if(orTop <= scroll){
//   Organization.classList.add('on')
// }
// else {
//   Organization.classList.remove('on')
// }

}

window.addEventListener('scroll' , function() {
showValue();
});

window.addEventListener('resize' , function() {
showValue();
});
