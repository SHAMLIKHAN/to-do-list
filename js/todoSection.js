var idParent;
function todoNewtask(id){
    console.log("@ todo Section!!!");
    var obj = taskList[id];
    var append;

    var div = document.createElement("div");
        var heading = document.createElement("block");
            var btn = document.createElement("block");
            btn.id = id+"btn";
            btn.style.float = "right";
            btn.innerHTML = "<i class='material-icons'>&#xe254;</i>";
            btn.onclick = editTask;
                /* FEATURE: {try-catch} */
            btn.addEventListener("mouseover",function(event){
                var idHover = event.target.id;
                try{
                    document.getElementById(idHover).style.cursor = "pointer";
                }catch(e){}
            });
            var name = document.createElement("block");
            name.id = id+"name";
            name.innerHTML = obj.taskName;
            name.onclick = toggleDiv;
        heading.appendChild(btn);
        heading.appendChild(name);
        heading.id = id+"heading";
    div.appendChild(heading);
    div.draggable = true;
    div.addEventListener("dragstart",function(event){
        player = event.target.parentNode.id;
        if(taskList[parseInt(event.target.id)].taskAssign === ""){
            console.log("The task isn't assigned yet!");
        }
        else{
            event.dataTransfer.setData("Text", event.target.id);
        }
    });
    div.id = id;

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
    idParent = document.getElementById(id).parentNode.id;
    closeModal();
    editableDiv(id);
}
function beginTask(id){
    var id = (this.id)? (this.id).charAt(0) : id;   /* FEATURE: {Conditional Operator} */
    closeModal();
    /*
    -- Here the corresponding div in the todo section will be deleted.
    */
    if(isNaN(id)===false){
        var div = document.getElementById(id);
        if(div){
            div.parentNode.removeChild(div);
        }
        taskList[id].status = "inprogress";
        console.log("Status of the assignment with id "+id+" is changed to 'inprogress'");
        inprogressNewTask(id);    /* Navigated to next js page */
    }
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
    if(idParent === "todo"){
        todoNewtask(id);
    }
    else{
        beginTask(id);
    }
}
function toggleDiv(){
    var id = this.id;
    document.getElementById(id).style.fontWeight = "bold";
    id = (this.id).charAt(0)+"details";
    if(document.getElementById(id).style.display === "none"){
        document.getElementById(id).style.display = "block";
    }
    else{
        document.getElementById(this.id).style.fontWeight = "normal";
        document.getElementById(id).style.display = "none";
    }
}
