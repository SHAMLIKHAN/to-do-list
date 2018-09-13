function inprogressNewTask(id){
    console.log("@ inprogress Section!!!");
    var obj = taskList[id];
    var appendInProg;
    var div = document.createElement("div");
        var heading = document.createElement("block");
            var btn = document.createElement("block");
            btn.id = id+"btn";
            btn.style.float = "right";
            btn.innerHTML = "<i class='material-icons'>&#xe254;</i>";
            btn.onclick = editTask;
            var name = document.createElement("block");
            name.id = id+"name";
            name.innerHTML = obj.taskName;
            name.onclick = toggleDiv;
        heading.appendChild(btn);
        heading.appendChild(name);
        heading.id = id+"heading";
    div.appendChild(heading);

    /* Inner Content */
        var block = document.createElement("block");
        var dt = getDateTime(obj.createdOn);
        var data =  "<p>Description: "+obj.taskDesc+" </p>"+
                    "<p>Assigned to: "+obj.taskAssign+" </p>"+
                    "<p>Priority: "+obj.taskPrio+" </p>"+
                    "<p>Created On: "+dt+" </p>";
        block.id = id+"details";
        block.innerHTML = data;
        block.style.display = "none";
    div.appendChild(block);
    /* Inner Content ends here! */

    div.id = id;
    div.draggable = true;
    div.addEventListener("dragstart",function(event){
        player = event.target.parentNode.id;
        event.dataTransfer.setData("Text", event.target.id);
    });

    var divCount = document.getElementById("inprogress").childElementCount;
    if(divCount==1){
        document.getElementById("inprogress").appendChild(div);
    }
    /* Sorting based on Priority */
    else{
        appendInProg = false;
        var pos = document.getElementById("inprogressHead").nextElementSibling.id;
        var current = document.getElementById(pos);
        while(taskList[pos].taskPrio < taskList[id].taskPrio){
            if(document.getElementById(pos).nextElementSibling==null){
                document.getElementById("inprogress").appendChild(div);
                appendInProg = true;
                break;
            }
            pos = document.getElementById(pos).nextElementSibling.id;
            current = document.getElementById(pos);
        }
        if(appendInProg===false){
            document.getElementById("inprogress").insertBefore(div,current);
        }
    }
    /* Sorting ends here! */
}
function finishTask(id){
    var id = (this.id)? (this.id).charAt(0): id;
    closeModal();

    var div = document.getElementById(id);
    if(div){
        div.parentNode.removeChild(div);
    }
    var date = new Date();
    var time = formatedTime(date);
    taskList[id].status = "done";
    taskList[id].finishedOn = time;
    console.log("Status of the assignment with id "+id+" is changed to 'done'");
    doneNewTask(id);  /* Navigated to next js page */
}
