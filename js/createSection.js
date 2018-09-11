var taskID = 0;
var taskList = [];  /* FEATURE: {Array Concepts} */
function addNewTask(){
    console.log("Function is called to create a new assignment.");

    var div = document.createElement("div");
        var taskLabel = document.createElement("label");
        var taskLabelName = document.createTextNode("Assignment Name:");
        taskLabel.appendChild(taskLabelName);
        var taskName = document.createElement("input");
        taskName.type = "text";
        taskName.id = "taskName";
        taskName.defaultValue = "Project LXVIII";

        var descLabel = document.createElement("label");
        var descLabelName = document.createTextNode("Assignment Description:");
        descLabel.appendChild(descLabelName);
        var descName = document.createElement("input");
        descName.type="text";
        descName.id = "descName";
        descName.defaultValue = "FR Project";

        var assignLabel = document.createElement("label");
        var assignLabelName = document.createTextNode("Assigned to:");
        assignLabel.appendChild(assignLabelName);
        var assignName = document.createElement("input");
        assignName.type="text";
        assignName.id = "assignName";
        assignName.defaultValue = "ShamliKhan";

        var prioLabel = document.createElement("label");
        var prioLabelName = document.createTextNode("Assignment Priority:");
        prioLabel.appendChild(prioLabelName);
        var prioName = document.createElement("input");
        prioName.type = "number";
        prioName.id = "prioName";
        prioName.defaultValue = 5;

        var btn = document.createElement("input");
        btn.value = "Submit";
        btn.type = "button";
        btn.onclick= submitTask;

    div.id = "input-box";
    div.appendChild(taskLabel);
    div.appendChild(taskName);
    div.appendChild(descLabel);
    div.appendChild(descName);
    div.appendChild(assignLabel);
    div.appendChild(assignName);
    div.appendChild(prioLabel);
    div.appendChild(prioName);
    div.appendChild(btn);

    var currentElement = document.getElementById("history");
    document.getElementById("create").insertBefore(div,currentElement);
}
function submitTask(){
    var div = document.getElementById("input-box");
    var taskName = document.getElementById("taskName").value;
    var taskDesc = document.getElementById("descName").value;
    var person = document.getElementById("assignName").value;
    var taskPrio = document.getElementById("prioName").value;
    var flag = processForm(taskName,taskDesc,person);
    if(flag){
        var date = new Date();
        var time = formatedTime(date);  /* FEATURE: {Object Concepts} */
        var obj = {
            taskName:taskName,
            taskDesc:taskDesc,
            taskAssign:person,
            taskPrio:taskPrio,
            createdOn:time,
            status:"todo"
        }
        if(div){
          div.parentNode.removeChild(div);
        }
        console.log("Created Assignment details are:");
        console.log(obj);
        taskList.push(obj);
        taskID = taskID+1;
        /*todoNewtask(taskID-1);    Navigated to next js page. */
        alert("Navigated to todo section!");
    }
    else{
        console.log("Warning: All fields are required!!");
    }
}
function formatedTime(date){
    var hrs = date.getHours();
    var mnt = date.getMinutes();
    var sec = date.getSeconds();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yy = date.getFullYear();
    if(dd<10){
        dd = '0'+dd;
    }
    if(mm<10){
        mm = '0'+mm;
    }
    var obj = {
        dd:dd,
        mm:mm,
        yyyy:yy,
        hours:hrs,
        minutes:mnt,
        seconds:sec
    }
    return obj;
}
function processForm(name,desc,person){
    if(name===""){
        console.log("Name of the Task is not entered.");
        return false;
    }
    if(desc===""){
        console.log("Description of the Task is not entered.");
        return false;
    }
    if(person===""){
        console.log("The Task isn't assigned yet.");
        return false;
    }
    return true;
}
