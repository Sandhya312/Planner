let taskTitle = document.getElementById("task-title");
// let taskDate = document.getElementById("task-date");
let AddBtn = document.getElementById("AddBtn");
let taskList = document.getElementById("task-list");
let events = [

];
// localStorage data
let eventsOpt = JSON.parse(localStorage.getItem("event"));

showEvents();

function inputElt() {
    AddBtn.disabled = (this.value === '');
}
let Id = 123;
// add to localstorage
AddBtn.addEventListener("click", () => {
    if (eventsOpt != null) {
        events = eventsOpt;
    }
    if (taskTitle.value !== '') {
        events.push(
            {
                id: Id++,
                title: taskTitle.value
            }
        )
    } else {
        alert("Empty input")
    }

    localStorage.setItem("event", JSON.stringify(events));
    taskTitle.value = "";
    showEvents();
});


// show to the frontend
function showEvents() {
    if (eventsOpt != null) {
        events = eventsOpt;
    }
    let html = "";
    events.forEach((event, index) => {
        html += `
   <div class="task d-flex mt-4">
   <input class="taskInput mx-2 ${index}" readonly id="${event.id}"  value='${event.title}  '>
   <button class=" completeBtn mx-2 btn btn-primary" onclick="completeTask(${index})"><i class='bx bx-check' style='color:#ffffff !important;'  ></i></button>
   <button class=" editBtn mx-2 btn btn-primary"  id="${index}" onclick="editTask(${index})"><i class='bx bxs-pencil'style='color:#ffffff !important;'></i></button>
 
  </div>
  `
    })
    if (taskList.length != 0) {
        taskList.innerHTML = html;
    }

}

// complete the task
function completeTask(index) {
    if (eventsOpt != null) {
        events = eventsOpt;
    }
    events.splice(index, 1);
    localStorage.setItem("event", JSON.stringify(events));
    showEvents();
}

// edit the task
function editTask(index) {
    console.log(index);
    let taskInputArr = document.querySelectorAll(".taskInput");
    let btn = document.getElementById(index);
    if (btn.className.includes("editBtn")) {
        btn.innerHTML = `<i class='bx bxs-save' style='color:#ffffff !important;'></i>`
        taskInputArr.forEach((e) => {
            if (e.className.includes(index)) {
                e.removeAttribute("readonly");
            }
        });
        btn.classList.remove("editBtn");
        btn.classList.add("saveBtn");

    } else if (btn.className.includes("saveBtn")) {
        btn.innerHTML = `<i class='bx bxs-pencil' style='color:#ffffff !important;'></i>`

        taskInputArr.forEach((e) => {
            if (e.className.includes(index)) {
                e.setAttribute("readonly", true);
                events.forEach((event) => {
                    if (e.id == event.id) {
                        event.title = e.value;
                        localStorage.setItem("event", JSON.stringify(events));

                    }

                })
            }
        });
        btn.classList.remove("saveBtn");
        btn.classList.add("editBtn");


    }


}



// alerm
let alarmBtn = document.getElementById("alarmBtn");
let selectMenu = document.querySelectorAll("select");
let timer = document.getElementById("timer");
let alarmTime;
let isAlarmSet = false;
let clearAlarmBtn = document.getElementById("clearAlarmBtn");
// let ringTone = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
let ringTone = new Audio("./assets/timeUp.mp3");
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `
    <option value="${i}">${i}</option>
    `
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `
    <option value="${i}">${i}</option>
    `
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `
    <option value="${i}">${i}</option>
    `
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM"
    let option = `
    <option value="${ampm}">${ampm}</option>
    `
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}


setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? h = 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    timer.innerText = `${h}:${m}:${s} ${ampm}`
    if (alarmTime == `${h}:${m}:${s} ${ampm}`) {
        console.log("Alarm ringing", alarmTime);
        ringTone.play();
        ringTone.loop = true;
    }
}, 1000)


function setAlarm() {
    let editBtn = document.querySelectorAll(".editBtn");
    let completeBtn = document.querySelectorAll(".completeBtn");
    completeBtn.forEach((e)=>{
        e.disabled=true;
    })
    editBtn.forEach((e)=>{
        e.disabled=true;
    })
    taskTitle.setAttribute("readonly",true);
    AddBtn.disabled=true;
    editBtn.disabled=true;

    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    if (time.includes("Hours") || time.includes("Minute") || time.includes("Seconds") || time.includes("AM/PM")) {
        return alert("Please select a valid time")
    }
    isAlarmSet = true;
    alarmTime = time;
}

function clearAlarm() {
    taskTitle.removeAttribute("readonly")
    AddBtn.disabled=false;
    let editBtn = document.querySelectorAll(".editBtn");
    let completeBtn = document.querySelectorAll(".completeBtn");
    completeBtn.forEach((e)=>{
        e.disabled=false;
    })
    editBtn.forEach((e)=>{
        e.disabled=false;
    })
   
    editBtn.disabled=false;
    if (isAlarmSet) {
        console.log("cleared alarm");
        alarmTime = "";
        ringTone.pause()
        return isAlarmSet = false;
    }
    isAlarmSet = true;

}

alarmBtn.addEventListener("click", setAlarm);
clearAlarmBtn.addEventListener("click", clearAlarm);