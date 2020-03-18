const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser"
    SHOWING_CN = "showing"

function saveName(name) {
    localStorage.setItem(USER_LS, name);
}

function handleSubmit(event) {
    /**
     *  event는 해당공간에서 반응공간을 찾지못하면
     *  상위단으로 계속 올라가며 자신이 반응할 곳까지
     *  찾아간다.
     *  찾지 못할때 document 상위로 가면서 새로고침 되기때문에
     *  event.preventDefault()로 그러한 습성을 막아준다.
     */
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerText = `hello ${text}`; 
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();
