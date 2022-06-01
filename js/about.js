
//scroll
const aboutCon = document.querySelectorAll('.about .inner > div');
const totalNum = aboutCon.length;

window.addEventListener("scroll", function (e) {
  const scroll = this.scrollY;
  for (let i = 0; i < totalNum; i++) {
    if (scroll > aboutCon[i].offsetTop - window.outerHeight / 2.5 && scroll < aboutCon[i].offsetTop - window.outerHeight / 2.5 + aboutCon[i].offsetHeight) {
      aboutCon[i].classList.add('on');
    } else {
      aboutCon[i].classList.remove('on');
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
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); 
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } 
    });
  });
});



