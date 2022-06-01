// accordion
const accordionBtn = document.querySelectorAll('.question');
const allTexts = document.querySelectorAll('.answer');
const accIcon = document.querySelectorAll('.faqIcon');

accordionBtn.forEach(function (el) {
    el.addEventListener('click', toggleAccordion)
});

function toggleAccordion(el) {
   const targetText = el.currentTarget.nextElementSibling.classList;
   const targetAccIcon = el.currentTarget.children[2];
  
   if (targetText.contains('show')) {
       targetText.remove('show');
       targetAccIcon.classList.remove('plus');
   } 
   else {
      accordionBtn.forEach(function (el) {
         
         allTexts.forEach(function (el) {
            el.classList.remove('show');
         })
         accIcon.forEach(function (el) {
          el.classList.remove('plus');
         }) 
      })
         targetText.add('show');
         targetAccIcon.classList.add('plus');

   }  
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



