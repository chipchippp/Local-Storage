let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dataInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
   if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
   } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
        add.setAttribute("data-bs-dismiss", "");
    })();
   }
};

let data = [{}];
let acceptData = () => {
    data.push ({
        text: textInput.value,
        data: dataInput.value,
        description: textarea.value,
    });
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += 
        <div id=${y}>
        <span class="fw-bold"> ${x.text} </span>
        <span class="small text-secondary"> ${x.date}</span>
        <p>$(x.description)</p>
        <span class="optons">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick= "editTask(this);createTasks()"  class="fas fa-trash-alt"></i>
        </span>
        </div> 
        );
    });
    resetForm();
};
let deleteTasks = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dataInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTasks(e);
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textInput.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();