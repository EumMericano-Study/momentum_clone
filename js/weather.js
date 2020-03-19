const weather = document.querySelector(".js-weather")

const API_KEY = "91ba96db83e31bbf6cf7b10794ba8f2a"
const COORDS = 'coords';

function getWeather(lat, lng) {
    /**
     *  fetch(): data를 request 할 때 사용
     *  fetch 함수는 backtick (`)을 사용한다
     *  JS가 강한 이유 중 하나, 
     *  웹 페이지의 새로고침 없이 지속적으로 웹을 refresh해줄 수 있음
     *  then을 통해 완전히 데이터를 받아온 상태에서 처리해준다.
     */
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        //json만 가져오기 .json()
        return response.json()
        // then을 여러개 쓸 수 있구나...
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
         weather.innerText = `${temperature} @ ${place}`
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    /**
     * 
     *   const coordsObj = {
     *      latitude : latitude,
     *      longitude : longitude
     *   }
     * 
     * JS에서 Object를 생성할때
     * 키값과 value값이 동일하다면 아래와 같이 생략할 수 있다.
     * 
     */
    
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj)
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can`t access geo location")
}

function askForCoords() {
    // navigator API 사용
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}


function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS)
    if(loadedCords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();