const form = document.querySelector("#form");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", e => {
  if (!isTxt("userid", 5)) e.preventDefault();
  if (!isEmail("email", 5)) e.preventDefault();
  if(!isCheck("hobby")) e.preventDefault(); 
  if(!isCheck("gender")) e.preventDefault(); 
  if(!isPwd("pwd1", 5)) e.preventDefault();
});

function isTxt(name, len) {
  let input = form.querySelector(`[name=${name}]`);
  let txt = input.value;
  if (txt.length >= len) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(`
    Please enter at least${len} characters for the entry item`);
    input.closest("td").append(errMsg);
    return false;
  }
}

function isEmail(name, len) {
  let input = form.querySelector(`[name=${name}]`);
  let txt = input.value;
  if (txt.length > len && /@/.test(txt)) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(`Please enter an email address with at least ${len}characters including '@'`);
    input.closest("td").append(errMsg);
    return false;
  }
}

function isCheck(name) {
  let inputs = form.querySelectorAll(`[name=${name}]`)
  let isChecked = false;

  for (let el of inputs) {
    if (el.checked) isChecked = true;
  }
  if (isChecked) {
    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

    return true;
  } else {
    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append("Please check the required entry item.");
    inputs[0].closest("td").append(errMsg);

    return false;
  }
}


function isPwd(name1, len) {
  let pwd1 = form.querySelector(`[name=${name1}]`);
  let pwd1_val = pwd1.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[~!@#$%^&*()_+|\[\]]/;

  if (pwd1_val  && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)) {
    const errMsgs = pwd1.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = pwd1.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(`Password must be at least ${len} characters and must be entered in the same way, including numbers`);
    pwd1.closest("td").append(errMsg);

    return false;
  }
}