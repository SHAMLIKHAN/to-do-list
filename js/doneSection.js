function doneNewTask(id){
    console.log("@ done Section!!!");
    var obj = taskList[id];
    var div = document.createElement("div");
    div.id = id;
        var heading = document.createElement("block");
            var name = document.createElement("block");
            name.id = id+"name";
            name.innerHTML = obj.taskName;
        heading.appendChild(name);
        heading.id = id+"heading";
    div.appendChild(heading);
    div.onclick = toggleDiv;

    /* Inner Content */
        var block = document.createElement("block");
        var dtCreated = getDateTime(obj.createdOn);
        var dtFinished = getDateTime(obj.finishedOn);
        var data =  "<p>Description: "+obj.taskDesc+" </p>"+
                    "<p>Assigned to: "+obj.taskAssign+" </p>"+
                    "<p>Priority: "+obj.taskPrio+" </p>"+
                    "<p>Created On: "+dtCreated+" </p>"+
                    "<p>Finished On: "+dtFinished+" </p>";
        block.id = id+"details";
        block.innerHTML = data;
        block.style.display = "none";
    div.appendChild(block);
    /* Inner Content ends here! */
    document.getElementById("done").appendChild(div);
}/*
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
            var dtCreated = getDateTime(obj.createdOn);
            var createdOn = document.createTextNode("Created on: "+dtCreated);
            timePara.appendChild(createdOn);
            var timeFinishedPara = document.createElement("p");
            var dtFinished = getDateTime(obj.finishedOn);
            var finishedOn = document.createTextNode("Finished on: "+dtFinished);
            timeFinishedPara.appendChild(finishedOn);
        div.appendChild(span);
        div.appendChild(namePara);
        div.appendChild(descPara);
        div.appendChild(assignPara);
        div.appendChild(prioPara);
        div.appendChild(timePara);
        div.appendChild(timeFinishedPara);
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}
*/
