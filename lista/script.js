function addTask() {

    //Avoid duplicated ids
    for (i = document.getElementsByTagName("li").length; i >= 0; i--) {
        if (document.getElementById(i) == null) {
            taskId = i;
            break
        }
    }
    //Add the task
    taskText = document.getElementById("new-task");

    if (taskText.value.length <= 54) {
        taskDate = new Date();
        month = taskDate.getMonth() + 1;
        fullTaskDate = "" + taskDate.getDate() + "/" + month + "/" + taskDate.getFullYear() + " - " + taskDate.getHours() + ":" + taskDate.getMinutes();

        if (taskText.value == "") {
            alert("You need to type something in the textbox to add a task");
        } else if (taskText != "") {
            document.getElementById("task-list").innerHTML += "<li class=list-element id=li" + taskId + "><div class=libg></div>" + taskText.value + "\
                                                                         <input type=checkbox class=checkbox id=" + taskId + "> <span class=check></span>\
                                                                         <input type=button class=sub-task onclick=addSubTaskBox(" + taskId + ") value='+' id=sub-" + taskId + ">\
                                                                         <input type=button class=hide-show-subtasks onclick=showHideSubTasks("+taskId+") value=v id=sh"+taskId+">\
                                                                         <div class=task-date>" + fullTaskDate + "</div> <ul class=subtask-list id=sb" + taskId + "></ul></li>";
            localStorage.setItem("tasks", taskList.innerHTML);
        }
    }
    taskTextBox = document.getElementById("new-task");
    taskTextBox.value = "";
}

function removeTask() {
    listElement = document.getElementsByTagName("li");
    checkboxes = document.getElementsByClassName("checkbox");

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
    taskList = document.getElementById("task-list");
    taskList.innerHTML = localStorage.getItem("tasks");

    listElement = document.getElementsByTagName("li");


    for (i = listElement.length - 1; i >= 0; i--) {
        subTasks = document.getElementById("sb" + i);
        subTasks.innerHTML = localStorage.getItem("subtasks" + i);
    }
//testing

}

function addSubTaskBox() {
    buttonId = document.activeElement.id.split("-")[1]
   
    document.getElementById("content").innerHTML += "<div id=stbtts class=subtask-buttons><input onkeypress=onKeyPress() type=text placeholder='Write your new sub task here' class=new-subtask id=newsb> <input class=add-newsubtask type=button value='Add subtask'></div>"
    document.getElementById("newsb").focus();
}

function addSubTask() {

    subTaskText = document.getElementById("newsb");
    if (subTaskText.value == "") {
        alert("You need to type something in the textbox to add a subtask");
    } else if (subTaskText != "") {
  
    document.getElementById("sb" + buttonId).innerHTML += "<div class=subtasks>" + subTaskText.value +"<hr class=line-over> </div>";
   // document.getElementById("sb" + buttonId).style.visibility = "visible";
    localStorage.setItem("subtasks" + buttonId, document.getElementById("sb" + buttonId).innerHTML);
    document.getElementById("stbtts").remove();

    
    }
}

function onKeyPress() {
    handleEvent = true;
    taskText = document.getElementById("new-task");
    if (taskText.value.length >= 53) {
        taskText.style.background = "rgba(255, 23, 7, 0.89)";
        taskText.style.color = "white";
        alert("You cannot exceed 53 characters.")
    } else {
        taskText.style.background = "white";
        taskText.style.color = "rgb(112, 32, 8)";
    }

    document.addEventListener("keydown",
        function(keyDown) {

            if (keyDown.code == "Backspace") {
                if (taskText.value.length <= 53) {
                    taskText.style.background = "white";
                    taskText.style.color = "rgb(112, 32, 8)";
                }
                removeTask();
            } else if (handleEvent == true && keyDown.code == "Enter" && document.activeElement.id == "new-task") {
                handleEvent = false;
                addTask();
            } else if (handleEvent == true && keyDown.code == "Enter" && document.activeElement.className == "new-subtask") {
                handleEvent = false;
                addSubTask();
            }
        })
}

function showHideSubTasks(taskId) {                          
                            subTaskList = document.getElementById("sb"+taskId);
                            
                            console.log( )
                           if(subTaskList.style.visibility != "hidden")
                              {
                                subTaskList.style.visibility = "hidden";
                                subTaskList.style.position = "absolute";

                                // foreach(subTaskList.getElementsByClassName("line-over"))
                                //         {

                                //         }
                              }
                              else {
                                    subTaskList.style.visibility = "visible";
                                    subTaskList.style.position = "static";
                              }
                          }

function swapDisplays() {
        
                          }
                          
$(document).ready(function () {

    //TODO: 
    display = "allNotes";
    noteId=1;

    $('textarea').val(localStorage.getItem("note1"));

   $('div').on('mousedown', '.noteSmallDisplay', function(event) {

        noteId = $(this)[0].id.split('smallDisplay')[1];
        $('#display').html('<textarea placeholder="Write your not here" id="textarea" spellcheck="false" class="noteText"></textarea>');
        $('textarea').val(localStorage.getItem("note"+noteId));
        display = "allNotes"

   })

   $('input').on('mousedown', function(event) {  

    event.stopPropagation(); 
    buttonType = $(this).val();
   
    if(buttonType == 'Show all notes') {
        if(display == "allNotes") {
            $('#display').html('');
            
        for(i=1; i<=6; i++) {
            if(localStorage.getItem("note"+i) != null) {
                $('#display').append('<div class="noteSmallDisplay" id='+"smallDisplay"+i+'></div>');
                $('#smallDisplay'+i).append(localStorage.getItem("note"+i));
            }
           // $('#display').html('Nothing to see here');
           display = "note";
        }
        }
        else if(display == "note") {
 
            $('#display').html('<textarea placeholder="Write your not here" id="textarea" spellcheck="false" class="noteText"></textarea>');
            $('textarea').val(localStorage.getItem("note"+noteId));
            display = "allNotes";
          
        }
    }

    
    if(buttonType == 'Save'){     
   /* NEVERMIND
   if(localStorage.getItem("note0") === null) {
        noteId = "0"; }
    else {
        for (i = 1; localStorage.getItem("note"+i) != null; i++) {               
            //Nothing to see here \(o)^(o)/    }
          noteId = i;  }*/

        noteText = $('textarea').val();
        localStorage.setItem("note"+noteId, noteText)

}
    if(buttonType == 'Remove'){
        $('textarea').val();
        localStorage.removeItem("note"+noteId);
        if(noteId == 1) {
            noteId+=1;
        }
        else {
                noteId-=1;
        }
        $('textarea').val(localStorage.getItem("note"+noteId));
    }
    if(buttonType == 'Next note >>') {
        noteId += 1;      
        for (i = noteId; i<=100; i++) {
             if(localStorage.getItem("note"+i) != null) {
                $('textarea').val(localStorage.getItem("note"+i));
                break;
             }
        }
  
        /* nope
        if(localStorage.getItem("note"+noteId) === null) {
            localStorage.setItem("note"+noteId, "new note");
            $('textarea').val(localStorage.getItem("note"+noteId));
        }*/
    }
    if(buttonType == '<< Last note') {
        if(noteId > 1) {
            noteId-=1;
        }
            for (i = noteId; i>0; i--) {
                if(localStorage.getItem("note"+i) != null) {
                   $('textarea').val(localStorage.getItem("note"+i));
                   break;
                }
           }
    }   
    if(buttonType == 'New note') {
        noteId=1;
        for (i=noteId; i<10; i++) {
            if(localStorage.getItem("note"+i) === null) {
                if(i>6) {
                    alert("The maximum umber of notes is: 6")
                    break;
                }
                localStorage.setItem("note"+i, "New note!")
                $('textarea').val(localStorage.getItem("note"+i));
                noteId=i;
                break;
            }
       }
    }
})

    $('div').on('mousedown','.subtasks', function(event){
        
        event.stopPropagation(); // Prevent event from bubbling up
        subTaskListID = $(this).parent()[0].id.split('sb')[1]
        if($(this).css('textDecoration').split(" ")[0] == "none")
        {
            $(this).css('textDecoration', 'line-through');
            $(this).css('background', 'rgba(255, 0, 0, 0.15)')
            $(this).children().css('visibility', 'visible')
            //The parent of the div is an element with id: 'sb' and a number
            localStorage.setItem("subtasks" + subTaskListID, document.getElementById("sb" + subTaskListID).innerHTML);
        }
        else {
         $(this).css('textDecoration', 'none')
         $(this).children().css('visibility', 'hidden')
         $(this).css('background', 'rgba(255, 0, 0, 0)')
         localStorage.setItem("subtasks" + subTaskListID, document.getElementById("sb" + subTaskListID).innerHTML)
         
        }
        
    })
})
    
