var taskID = 0;
var taskList = [];  /* FEATURE: {Array Concepts} */
var people = ['ShamliKhan','Angith','Suraj','Amal','Wasim Akram'];
var lock = true;
function addNewTask(){
    console.log("Function is called to create a new assignment.");
    if(lock){
        lock = false;
        var div = document.createElement("div");
            var taskLabel = document.createElement("label");
            var taskLabelName = document.createTextNode("Assignment Name:");
            taskLabel.appendChild(taskLabelName);
            var taskName = document.createElement("input");
            taskName.type = "text";
            taskName.id = "taskName";
            taskName.defaultValue = "Project LXVIII";

            var descLabel = document.createElement("label");
            descLabel.id = "descLabel";
            var descLabelName = document.createTextNode("Assignment Description:");
            descLabel.appendChild(descLabelName);
            var descName = document.createElement("input");
            descName.type="text";
            descName.id = "descName";
            descName.defaultValue = "FR Project";

            var assignLabel = document.createElement("label");
            assignLabel.id = "assignLabel";
            var assignLabelName = document.createTextNode("Assigned to:");
            assignLabel.appendChild(assignLabelName);
            var assignName = document.createElement("input");
            assignName.type = "text";
            assignName.setAttribute("list","employees");
            assignName.id = "assignName";

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
            prioName.id = "prioName";
            prioName.defaultValue = 5;

            var btn = document.createElement("input");
            btn.id = "btnSubmit";
            btn.value = "Submit";
            btn.type = "button";
            btn.style.fontWeight = "bold";
            btn.onclick= submitTask;

        div.id = "input-box";
        div.appendChild(taskLabel);
        div.appendChild(taskName);
        div.appendChild(descLabel);
        div.appendChild(descName);
        div.appendChild(assignLabel);
        div.appendChild(assignName);
        div.appendChild(dataList);
        div.appendChild(prioLabel);
        div.appendChild(prioName);
        div.appendChild(btn);

        var currentElement = document.getElementById("history");
        document.getElementById("create").insertBefore(div,currentElement);
    }
    else{
        console.log("Submit the task before creating another!");
    }
}
function submitTask(){
    clearLabels();
    var div = document.getElementById("input-box");
    var taskName = document.getElementById("taskName").value;
    var taskDesc = document.getElementById("descName").value;
    var person = document.getElementById("assignName").value;
    var taskPrio = parseInt(document.getElementById("prioName").value);
    var flag = processForm(taskName,taskDesc,taskPrio);
    if(flag){
        var date = new Date();
        var time = formatedTime(date);  /* FEATURE: {Object Concepts} */
        var obj = {
            taskName:taskName,
            taskDesc:taskDesc,
            taskAssign:person,
            taskPrio:taskPrio,
            createdOn:time,
            finishedOn:"Not Finished!",
            status:"todo"
        }
        if(div){
          div.parentNode.removeChild(div);
        }
        console.log("Created Assignment details are:");
        console.log(obj);
        taskList.push(obj);
        taskID = taskID+1;
        lock = true;
        todoNewtask(taskID-1);    /* Navigated to next js page. */
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
function processForm(name,desc,prio){
    var status = true;
    var reqName = document.createTextNode("Enter the name of the Assignment!");
    var reqDesc = document.createTextNode("Enter the description of the Assignment!");
    if(name === ""){
        console.log("Name of the Task is not entered.");
        var reqLabel = document.createElement("label");
        reqLabel.style.color = "red";
        reqLabel.appendChild(reqName);
        reqLabel.id = "noName";
        document.getElementById("input-box").insertBefore(reqLabel,document.getElementById("descLabel"));
        status = false;
    }
    if(desc === ""){
        console.log("Description of the Task is not entered.");
        var reqLabel = document.createElement("label");
        reqLabel.style.color = "red";
        reqLabel.appendChild(reqDesc);
        reqLabel.id = "noDesc";
        document.getElementById("input-box").insertBefore(reqLabel,document.getElementById("assignLabel"));
        status = false;
    }
    if(isNaN(prio)){
        console.log("The Task priority isn't assigned yet.");
        var reqLabel = document.createElement("label");
        reqLabel.style.color = "red";
        var reqPrio = document.createTextNode("Priority of can't be empty!");
        reqLabel.appendChild(reqPrio);
        reqLabel.id = "noPrio";
        document.getElementById("input-box").insertBefore(reqLabel,document.getElementById("btnSubmit"));
        status = false;
    }
    if(prio<=0){
        console.log("The Task priority is invalid.");
        var reqLabel = document.createElement("label");
        reqLabel.style.color = "red";
        var reqPrio = document.createTextNode("Assign valid priority!");
        reqLabel.appendChild(reqPrio);
        document.getElementById("input-box").insertBefore(reqLabel,document.getElementById("btnSubmit"));
        status = false;
    }
    return status;
}
function clearLabels(){
    var reqLabel = document.getElementById("noName");
    if(reqLabel){
        reqLabel.parentNode.removeChild(reqLabel);
    }
    reqLabel = document.getElementById("noDesc");
    if(reqLabel){
        reqLabel.parentNode.removeChild(reqLabel);
    }
    reqLabel = document.getElementById("noPrio");
    if(reqLabel){
        reqLabel.parentNode.removeChild(reqLabel);
    }
}
