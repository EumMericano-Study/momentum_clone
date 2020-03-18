const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
       
    // `` (벡틱) 기호를 통해 변수를 대입해준다.
    // 3항연산자로 10 이하의 숫자 앞에 0 을 붙혀준다.
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
}

function init(){   
    getTime();
    // setInterval(arg_1, arg_2)
    // arg_1: 실행할함수 이름  ()를 넣지 않는다, arg_2: 실행할 시간 간격 (ms)
    setInterval(getTime, 1000);
}

init();
