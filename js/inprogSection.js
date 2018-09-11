function inprogressNewTask(id){
    console.log("@ inprogress Section!!!");
    var obj = taskList[id];
    var div = document.createElement("div");
    div.innerHTML = obj.taskName;
    div.id = id;
    div.onclick = viewProg;
    document.getElementById("inprogress").appendChild(div);
}
function viewProg(){
    var id = this.id;
    var obj = taskList[id];
    console.log("Assignment with id "+id+" is clicked to view progress!");
    var modalDiv = document.getElementById("modalDiv");
        var div = document.createElement("div");
        div.id = "modalInnerDiv";
            var namePara = document.createElement("p");
            namePara.innerHTML = "<b>"+obj.taskName+"</b>";
            var span = document.createElement("span");
            span.onclick = closeModal;
            span.innerHTML = "&times";
            span.id = "close";
            var descPara = document.createElement("p");
            var taskDesc = document.createTextNode("Description: "+obj.taskDesc);
            descPara.appendChild(taskDesc);
            var assignPara = document.createElement("p");
            var taskAssign = document.createTextNode("Assigned to: "+obj.taskAssign);
            assignPara.appendChild(taskAssign);
            var prioPara = document.createElement("p");
            var taskPrio = document.createTextNode("Priority: "+obj.taskPrio);
            prioPara.appendChild(taskPrio);
            var timePara = document.createElement("p");
            var dt = getDateTime(obj.createdOn);
            var createdOn = document.createTextNode("Created on: "+dt);
            timePara.appendChild(createdOn);
            var btnFinish = document.createElement("input");
            btnFinish.onclick = finishTask;
            btnFinish.id = id+"btnFinish";
            btnFinish.type = "button";
            btnFinish.value = "Assign Work as Finished!";
        div.appendChild(span);
        div.appendChild(namePara);
        div.appendChild(descPara);
        div.appendChild(assignPara);
        div.appendChild(prioPara);
        div.appendChild(timePara);
        div.appendChild(btnFinish);
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}
function finishTask(){
    var id = (this.id).charAt(0);
    closeModal();

    var div = document.getElementById(id);
    if(div){
        div.parentNode.removeChild(div);
    }
    taskList[id].status = "done";
    console.log("Status of the assignment with id "+id+" is changed to 'done'");
    /*doneNewTask(id);  Navigated to next js page */
    alert("Navigated to 'done' section!");
}
