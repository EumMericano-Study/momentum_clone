const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event){
    // 먼저 li를 삭제해야한다.
    // console.dir(event.target)을 통해
    // parent id를 알 수 있다.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    // filter는 true값을 가진 원소만으로 새로운 배열을 만들어준다.
    const cleanToDos = toDos.filter(function(toDo){
        // 자료형 주의
        // console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos
    saveToDos()
}


function saveToDos() {
    /**
     *  JS는 모든 데이터를 String 형태로 받기 떄문에
     *  Object형태인 toDos를 그냥 저장하면 
     *  이를 이용할 수 없다.
     * 
     *  이럴땐 JSON.stringify() 를 사용한다
     *  JSON.stringify() 는 Json형태의 파일을
     *  string으로 전환해주는 역할을 한다.
     */
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    
    // html에 li를 그려준다
    delBtn.innerText = "🙆‍♂️";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    // Local Storage에 toDo Object를 저장한다.
    const toDoObj = {
        text: text,
        // 아직 넣지 않은항목이므로 id에 + 1  을 해준다.
        id: newId
    };
    toDos.push(toDoObj)
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // string 형태의 자료를 JSON형태로 바꿔준다.
        const parsedToDos = JSON.parse(loadedToDos);
        // Array 기본함수 forEach()
        // Array안에 있는 것들을 한번씩 실행해준다.
        // function을 그냥 바로 구현해주었다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();