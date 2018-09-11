function doneNewTask(id){
    console.log("@ done Section!!!");
    var obj = taskList[id];
    var div = document.createElement("div");
    div.innerHTML = obj.taskName;
    div.id = id;
    div.onclick = taskDetails;
    document.getElementById("done").appendChild(div);
}
function taskDetails(){
    var id = this.id;
    var obj = taskList[id];
    console.log("Assignment with id "+id+" is clicked to view details!");
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
        div.appendChild(span);
        div.appendChild(namePara);
        div.appendChild(descPara);
        div.appendChild(assignPara);
        div.appendChild(prioPara);
        div.appendChild(timePara);
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}
