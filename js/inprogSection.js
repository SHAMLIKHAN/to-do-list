function beginTask(id){
    /* FEATURE: {Conditional Operator} */
    var id = (this.id)? (this.id).charAt(0) : id;

    /* Here the corresponding div in the todo section will be deleted. */
    if(isNaN(id) === false){
        var div = document.getElementById(id);
        if(div){
            div.parentNode.removeChild(div);
        }
        taskList[id].status = "inprogress";
        console.log("Status of the assignment with id "+id+" is changed to 'inprogress'");
        inprogressNewTask(id);
    }
}

function inprogressNewTask(id){
    console.log("@ inprogress Section!!!");
    var obj = taskList[id];
    var append;  /* To know whether the div is to be appendable or not! */
    var div = document.createElement("div");
        var heading = document.createElement("block");
            var btn = document.createElement("block");
            btn.id = id+"btn";
            btn.style.float = "right";
            btn.innerHTML = "<i class='material-icons'>&#xe254;</i>";
            btn.onclick = editTask;
            btn.addEventListener("mouseover",function(event){
                var hoverID = event.target.id;
                try{
                    document.getElementById(hoverID).style.cursor = "pointer";
                }catch(e){}
            });

            var name = document.createElement("block");
            name.id = id+"name";
            name.innerHTML = obj.taskName;
            name.onclick = toggleDiv;
        heading.appendChild(name);
        heading.appendChild(btn);
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
        append = false;
        var pos = document.getElementById("inprogressHead").nextElementSibling.id;
        var current = document.getElementById(pos);
        while(taskList[pos].taskPrio < taskList[id].taskPrio){
            if(document.getElementById(pos).nextElementSibling == null){
                document.getElementById("inprogress").appendChild(div);
                append = true;
                break;
            }
            pos = document.getElementById(pos).nextElementSibling.id;
            current = document.getElementById(pos);
        }
        if(append === false){
            document.getElementById("inprogress").insertBefore(div,current);
        }
    }
    /* Sorting ends here! */
}
