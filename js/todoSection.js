function todoNewtask(id){
    console.log("@ todo Section!!!");
    var obj = taskList[id];
    var append;

    var div = document.createElement("div");
    div.innerHTML = obj.taskName;
    div.onclick = viewDiv;
    div.draggable = true;
    div.addEventListener("dragstart",function(event){
        player = event.target.parentNode.id;
        console.log(player);
        event.dataTransfer.setData("Text", event.target.id);
    });
    div.id = id;
    var divCount = document.getElementById("todo").childElementCount;
    if(divCount==1){
        document.getElementById("todo").appendChild(div);
    }
    /* Sorting based on Priority */
    else{
        append = false;
        var pos = document.getElementById("todoHead").nextElementSibling.id;
        var current = document.getElementById(pos);
        while(taskList[pos].taskPrio < taskList[id].taskPrio){
            if(document.getElementById(pos).nextElementSibling==null){
                document.getElementById("todo").appendChild(div);
                append = true;
                break;
            }
            pos = document.getElementById(pos).nextElementSibling.id;
            current = document.getElementById(pos);
        }
        if(append===false){
            document.getElementById("todo").insertBefore(div,current);
        }
    }
    /* Sorting ends here! */
}
function viewDiv(){
    var id = this.id;
    var obj = taskList[id];
    console.log("Assignment with id "+id+" is clicked to view!");
    var modalDiv = document.getElementById("modalDiv");
        var div = document.createElement("div");
        div.id = "modalInnerDiv";
            var namePara = document.createElement("p");
            namePara.innerHTML = "<b>"+obj.taskName+"</b>";
            var span = document.createElement("span");
            span.onclick = closeModal;
            span.innerHTML = "&times";
            span.style.fontWeight = "bold";
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
            var btnEdit = document.createElement("input");
            btnEdit.onclick = editTask;
            btnEdit.id = id+"btnEdit";
            btnEdit.type = "button";
            btnEdit.style.fontWeight = "bold";
            btnEdit.value = "Edit Task Details";
            var btnBegin = document.createElement("input");
            btnBegin.onclick = beginTask;
            btnBegin.id = id+"btnBegin";
            btnBegin.style.fontWeight = "bold";
            btnBegin.type = "button";
            btnBegin.value = "Begin To Work";
        div.appendChild(span);
        div.appendChild(namePara);
        div.appendChild(descPara);
        div.appendChild(assignPara);
        div.appendChild(prioPara);
        div.appendChild(timePara);
        div.appendChild(btnEdit);
        div.appendChild(btnBegin);
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}
function closeModal(){
    var modalDiv = document.getElementById("modalDiv");
        var div = document.getElementById("modalInnerDiv");
        if(div){
            div.parentNode.removeChild(div);
        }
    modalDiv.style.display = "none";
}
function getDateTime(obj){
    var date = obj.dd+"/"+obj.mm+"/"+obj.yyyy;
    var time = obj.hours+":"+obj.minutes+":"+obj.seconds;
    return (date+" "+time);
}
function editTask(){
    var id = (this.id).charAt(0);
    closeModal();
    editableDiv(id);
}
function beginTask(id){
    var id = (this.id)? (this.id).charAt(0) : id;   /* FEATURE: {Conditional Operator} */
    closeModal();
    /*
    -- Here the corresponding div in the todo section will be deleted.
    */
    var div = document.getElementById(id);
    if(div){
        div.parentNode.removeChild(div);
    }
    taskList[id].status = "inprogress";
    console.log("Status of the assignment with id "+id+" is changed to 'inprogress'");
    inprogressNewTask(id);    /* Navigated to next js page */
}
function editableDiv(id){
    var obj = taskList[id];

    var modalDiv = document.getElementById("modalDiv");
        var div = document.createElement("div");
        div.id = "modalInnerDiv";
            var namePara = document.createElement("p");
            namePara.innerHTML = "<b>"+obj.taskName+"</b>";
            var span = document.createElement("span");
            span.onclick = closeModal;
            span.innerHTML = "&times";
            span.id = "close";

            var assignLabel = document.createElement("label");
            var assignLabelName = document.createTextNode("Assigned to:");
            assignLabel.appendChild(assignLabelName);
            var assignName = document.createElement("input");
            assignName.type="text";
            assignName.id = "re-assignName";
            assignName.setAttribute("list","employees");
            assignName.defaultValue = obj.taskAssign;

            /* Adding Autocomletion of People */
            var dataList = document.createElement("datalist");
            dataList.id = "employees";
            for(let i=0;i<people.length;i++){
                var option = document.createElement("option");
                option.value = people[i];
                dataList.appendChild(option);
            }
            /* Autocompletion ends here! */

            var prioLabel = document.createElement("label");
            var prioLabelName = document.createTextNode("Assignment Priority:");
            prioLabel.appendChild(prioLabelName);
            var prioName = document.createElement("input");
            prioName.type = "number";
            prioName.id = "re-prioName";
            prioName.defaultValue = obj.taskPrio;

            var btnSave = document.createElement("input");
            btnSave.onclick = saveTask;
            btnSave.id = id+"btnSave";
            btnSave.type = "button";
            btnSave.style.fontWeight = "bold";
            btnSave.value = "Save";
        div.appendChild(span);
        div.appendChild(namePara);
        div.appendChild(assignLabel)
        div.appendChild(assignName);
        div.appendChild(dataList);
        div.appendChild(prioLabel);
        div.appendChild(prioName);
        div.appendChild(btnSave);
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}
function saveTask(){
    var id = (this.id).charAt(0);
    var person = document.getElementById("re-assignName").value;
    var prio = parseInt(document.getElementById("re-prioName").value);
    var date = new Date();
    var time = formatedTime(date);
    with(taskList[id]){
        taskPrio=prio;
        taskAssign=person;
        createdOn=time;
    }
    console.log("Assignment with id "+id+" is edited!");
    closeModal();
    var div = document.getElementById(id);
    if(div){
        div.parentNode.removeChild(div);
    }
    todoNewtask(id);
}
