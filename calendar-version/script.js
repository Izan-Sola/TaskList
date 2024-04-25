var taskId;

function addTask() {

    //Avoid duplicated ids
    for (i = document.getElementsByTagName("li").length; i >= 0; i--) {
        if (document.getElementById(i) == null) {
            var taskId = i;
            break
        }
    }
    //Add the task and show the date in which the task was added
    taskText = document.getElementById("new-task");

    if (taskText.value.length <= 40) {
        taskDate = new Date();
        month = taskDate.getMonth() + 1;
        fullTaskDate = "" + taskDate.getDate() + "/" + month + "/" + taskDate.getFullYear() + " - " + taskDate.getHours() + ":" + taskDate.getMinutes();

        if (taskText.value == "") {
          // alert("You need to type something in the textbox to add a task");
        } else if (taskText != "") {
            document.getElementById("task-list").innerHTML += "<li class=list-element id=li" + taskId + "><div class=libg></div>" + taskText.value + "\
                                                                         <input type=checkbox class=checkbox id=" + taskId + "> <span class=check></span>\
                                                                         <input type=button class=sub-task onclick=addSubTaskBox(" + taskId + ") value='+' id=sub-" + taskId + ">\
                                                                         <input type=button class=hide-show-subtasks onclick=showHideSubTasks(" + taskId + ") value=v id=sh" + taskId + ">\
                                                                         <div class=task-date>" + fullTaskDate + "</div> <ul style='visibility: hidden; position: absolute' class=subtask-list id=sb" + taskId + "></ul></li>";
            localStorage.setItem("tasks", taskList.innerHTML);
        }
    }
    taskTextBox = document.getElementById("new-task");
    taskTextBox.value = "";
}

function removeTask() {
    listElement = document.getElementsByTagName("li");
    checkboxes = document.getElementsByClassName("checkbox");

    //Check for checked checkboxes and remove the correspondent elements
    for (i = checkboxes.length - 1; i >= 0; i--) {
        checkBoxCheck = checkboxes.item(i);
        //console.log(checkBoxCheck);
        if (checkBoxCheck.checked == true) {
            console.log(listElement);
            listElement.item(i).remove();

            localStorage.removeItem("subtasks" + i);
        }
    }
    taskList = document.getElementById("task-list");
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {

    //Load the tasks
    taskList = document.getElementById("task-list");
    taskList.innerHTML = localStorage.getItem("tasks");
    
    listElement = document.getElementsByTagName("li");

    //Load the subtasks and hide the lines
    for (i = listElement.length - 1; i >= 0; i--) {
        subTasks = document.getElementById("sb" + i);
        subTasks.innerHTML = localStorage.getItem("subtasks" + i); 
    }
    $('.line-over').css('opacity', '0')
}

function addSubTaskBox() {
    buttonId = document.activeElement.id.split("-")[1]

    document.getElementById("content").innerHTML += "<div id=stbtts class=subtask-buttons><input onkeypress=onKeyPress() type=text placeholder='Write your sub task here' class=new-subtask id=newsb> <input onclick=addSubTask() class=add-newsubtask type=button value='Add subtask'></div>"
    document.getElementById("newsb").focus();
}

function addSubTask() {

    subTaskText = document.getElementById("newsb");
    if (subTaskText.value == "") {
        //alert("You need to type something in the textbox to add a subtask");
    } else if (subTaskText != "") {
    
        document.getElementById("sb" + buttonId).innerHTML += "<div class=subtasks>" + subTaskText.value + "<hr style='visibility: hidden; opacitiy: 0' class=line-over> </div>";
        // document.getElementById("sb" + buttonId).style.visibility = "visible";
        localStorage.setItem("subtasks" + buttonId, document.getElementById("sb" + buttonId).innerHTML);
        document.getElementById("stbtts").remove();

        subTaskList = document.getElementById("sb" + buttonId);
        console.log(subTaskList)

        subTaskList.style.visibility = "visible";
        subTaskList.style.position = "static";

        $('#sb'+buttonId+' .line-over').css('opacity', '1')
    }
}

function onKeyPress() {
    handleEvent = true;
    taskText = document.getElementById("new-task");
    if (taskText.value.length >= 40) {
        taskText.style.background = "rgba(255, 23, 7, 0.89)";
        taskText.style.color = "white";
        //alert("You cannot exceed 53 characters.")
    } else {
        taskText.style.background = "white";
        taskText.style.color = "rgb(112, 32, 8)";
    }

    document.addEventListener("keydown", function(keyDown) {
        if (keyDown.code == "Backspace") {
            if (taskText.value.length <= 40) {
                taskText.style.background = "white";
                taskText.style.color = "rgb(112, 32, 8)";
            }
            removeTask();
        } else if (handleEvent && (keyDown.code == "Enter")) {
            if (document.activeElement.id == "new-task") {
                handleEvent = false;
                addTask();
            } else if (document.activeElement.className == "new-subtask") {
                handleEvent = false;
                addSubTask(taskId);
            }
        }
    });
    
}

function showHideSubTasks(taskId) {

    subTaskList = document.getElementById("sb" + taskId);
    if (subTaskList.style.visibility != "hidden") {
        subTaskList.style.visibility = "hidden";
        subTaskList.style.position = "absolute";

        $('#sb'+taskId+' .line-over').css('opacity', '0')
    } else {
        subTaskList.style.visibility = "visible";
        subTaskList.style.position = "static";
        
        $('#sb'+taskId+' .line-over').css('opacity', '1')
    }
}

$(document).ready(function() {

    $('div').on('mousedown', '.subtasks', function(event) {
        event.stopPropagation(); // Prevent event from bubbling up
        subTaskListID = $(this).parent()[0].id.split('sb')[1]
        if ($(this).css('textDecoration').split(" ")[0] == "none") {
            $(this).css('textDecoration', 'line-through');
            $(this).css('background', 'rgba(255, 0, 0, 0.15)')
            $(this).children().css('visibility', 'visible')
            //The parent of the div is an element with id: 'sb' and a number
            localStorage.setItem("subtasks" + subTaskListID, document.getElementById("sb" + subTaskListID).innerHTML);
        } else {
            $(this).css('textDecoration', 'none')
            $(this).children().css('visibility', 'hidden')
            $(this).css('background', 'rgba(255, 0, 0, 0)')
            localStorage.setItem("subtasks" + subTaskListID, document.getElementById("sb" + subTaskListID).innerHTML)
        }
    })
})
