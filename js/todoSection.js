function todoNewtask(id) {
    console.log("@ todo Section!!!");
    var obj = taskList[id];
    var append; /* to know whether the div is to be appendable or not! */

    var div = document.createElement("div");
        var heading = document.createElement("block");
            var name = document.createElement("block");
            name.id = id+"name";
            name.innerHTML = obj.taskName;
            name.onclick = toggleDiv;

            var btn = document.createElement("block");
            btn.id = id+"btn";
            btn.style.float = "right";
            btn.innerHTML = "<i class='material-icons'>&#xe254;</i>";
            btn.onclick = editTask;
            /* feature: {try-catch} */
            btn.addEventListener("mouseover",function(event) {
                var hoverID = event.target.id;
                try {
                    document.getElementById(hoverID).style.cursor = "pointer";
                }catch(e) {
                    console.log(e);
                }
            });
        heading.appendChild(name);
        heading.appendChild(btn);
        heading.id = id+"heading";
    div.appendChild(heading);
    div.draggable = true;
    div.addEventListener("dragstart",function(event) {
        player = event.target.parentNode.id;
        if(taskList[parseInt(event.target.id)].taskAssign === "") {
            console.log("The task isn't assigned yet!");
        }
        event.dataTransfer.setData("Text", event.target.id);
    });
    div.id = id;

    /* inner Content */
        var block = document.createElement("block");
        var dt = getDateTime(obj.createdOn);
        var data = "<p>Description: "+obj.taskDesc+" </p>"+
                    "<p>Assigned to: "+obj.taskAssign+" </p>"+
                    "<p>Priority: "+obj.taskPrio+" </p>"+
                    "<p>Created On: "+dt+" </p>";
        block.id = id+"details";
        block.innerHTML = data;
        block.style.display = "none";
    div.appendChild(block);
    /* inner Content ends here! */

    var divCount = document.getElementById("todo").childElementCount;
    if(divCount==1) {
        document.getElementById("todo").appendChild(div);
    }
    /* sorting based on Priority */
    else {
        append = false;
        var pos = document.getElementById("todoHead").nextElementSibling.id;
        var current = document.getElementById(pos);
        while(taskList[pos].taskPrio < taskList[id].taskPrio) {
            if(document.getElementById(pos).nextElementSibling === null) {
                append = true;
                document.getElementById("todo").appendChild(div);
                break;
            }
            pos = document.getElementById(pos).nextElementSibling.id;
            current = document.getElementById(pos);
        }
        if(append===false) {
            document.getElementById("todo").insertBefore(div,current);
        }
    }
    /* sorting ends here! */
}

function toggleDiv() {
    var [id, idBlock] = [(this.id),(this.id).charAt(0)+"details"];  /* object destructuring. */
    document.getElementById(id).style.fontWeight = "bold";
    if(document.getElementById(idBlock).style.display === "none") {
        document.getElementById(idBlock).style.display = "block";
    }
    else {
        document.getElementById(id).style.fontWeight = "normal";
        document.getElementById(idBlock).style.display = "none";
    }
}

function editTask() {
    var id = (this.id).charAt(0);
    var obj = taskList[id];
    var modalDiv = document.getElementById("modalDiv");
        var div = document.createElement("div");
        div.id = "modalInnerDiv";
            var span = document.createElement("span");
            span.onclick = closeModal;
            span.innerHTML = "&times";
            span.id = "close";

            var namePara = document.createElement("p");
            namePara.innerHTML = "<b>"+obj.taskName+"</b>";

            var assignLabel = document.createElement("label");
            var assignLabelName = document.createTextNode("Assigned to:");
            assignLabel.appendChild(assignLabelName);
            var assignName = document.createElement("input");
            assignName.type="text";
            assignName.id = "re-assignName";
            assignName.setAttribute("list","employees");
            assignName.defaultValue = obj.taskAssign;

            /* adding Autocomletion of People */
            var dataList = document.createElement("datalist");
            dataList.id = "employees";
            for(let i=0; i<people.length; i++) {
                var option = document.createElement("option");
                option.value = people[i];
                dataList.appendChild(option);
            }
            /* autocompletion ends here! */

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
        div.appendChild(assignLabel);
        div.appendChild(assignName);
        div.appendChild(dataList);
        div.appendChild(prioLabel);
        div.appendChild(prioName);
        div.appendChild(btnSave);
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}

function saveTask() {
    clearLabels();
    var id = (this.id).charAt(0);
    var parentID = document.getElementById(id).parentNode.id;
    var person = document.getElementById("re-assignName").value;
    var prio = parseInt(document.getElementById("re-prioName").value);
    var flag = validatePrio(id,prio);
    if(flag) {
        var date = new Date();
        var time = formatedTime(date);
        taskList[id].taskPrio=prio;
        taskList[id].taskAssign=person;
        taskList[id].createdOn=time;
        console.log("Assignment with id "+id+" is edited!");
        closeModal();
        var div = document.getElementById(id);
        if(div) {
            div.parentNode.removeChild(div);
        }
        if(parentID === "todo") {
            todoNewtask(id);
        }
        else {
            beginTask(id); /* navigated to next js page. */
        }
    }
}

function getDateTime(obj) {
    var date = obj.dd+"/"+obj.mm+"/"+obj.yyyy;
    var time = obj.hours+":"+obj.minutes+":"+obj.seconds;
    return (date+" "+time);
}

function validatePrio(id,prio) {
    function createLabel() {
        var reqLabel = document.createElement("label");
        reqLabel.style.color = "red";
        return reqLabel;
    }
    var status = true;
    var reqLabel, reqPrio;
    if(isNaN(prio)) {
        console.log("The Task priority isn't assigned yet.");
        reqPrio = document.createTextNode("Priority can't be empty!");
        reqLabel = createLabel();
        reqLabel.id = "noPrio";
        reqLabel.appendChild(reqPrio);
        document.getElementById("modalInnerDiv").insertBefore(reqLabel,document.getElementById(id+"btnSave"));
        status = false;
    }
    if(prio <= 0) {
        console.log("The Task priority is invalid.");
        if(prio == 0) {
            reqPrio = document.createTextNode("Priority can't be zero!");
        }
        else {
            reqPrio = document.createTextNode("Priority can't be negative!");
        }
        reqLabel = createLabel();
        reqLabel.id = "invalidPrio";
        reqLabel.appendChild(reqPrio);
        document.getElementById("modalInnerDiv").insertBefore(reqLabel,document.getElementById(id+"btnSave"));
        status = false;
    }
    return status;
}
