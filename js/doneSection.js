function finishTask(ID) {
    var id;
    if(this.id) {
        id = (this.id).charAt(0);
    }
    else {
        id = ID;
    }
    /* the corresponding div in the inprogress section will be deleted. */
    var div = document.getElementById(id);
    if(div) {
        div.parentNode.removeChild(div);
    }
    var date = new Date();
    var time = formatedTime(date);
    taskObj.getTask(id).status = "done";
    taskObj.getTask(id).finishedOn = time;
    console.log("Status of the assignment with id "+id+" is changed to 'done'");
    doneNewTask(id);
}

function doneNewTask(id) {
    console.log("@ done Section!!!");
    var obj = taskObj.getTask(id);
    var div = document.createElement("div");
    div.id = id;
        var heading = document.createElement("block");
            var name = document.createElement("block");
            name.id = id+"name";
            name.innerHTML = obj.taskName;
            name.onclick = toggleDiv;
        heading.appendChild(name);
        heading.id = id+"heading";
    div.appendChild(heading);

    /* inner Content */
        var block = document.createElement("block");
        var dtCreated = getDateTime(obj.createdOn);
        var dtFinished = getDateTime(obj.finishedOn);
        var data = "<p>Description: "+obj.taskDesc+" </p>"+
                    "<p>Assigned to: "+obj.taskAssign+" </p>"+
                    "<p>Priority: "+obj.taskPrio+" </p>"+
                    "<p>Created On: "+dtCreated+" </p>"+
                    "<p>Finished On: "+dtFinished+" </p>";
        block.id = id+"details";
        block.innerHTML = data;
        block.style.display = "none";
    div.appendChild(block);
    /* inner Content ends here! */
    document.getElementById("done").appendChild(div);
}
