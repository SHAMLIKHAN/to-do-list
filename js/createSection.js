var taskID = 0;

/* feature: {Array Concepts} */
var taskList = [];
var people = ['ShamliKhan','Angith','Suraj','Amal','Wasim Akram'];

function addNewTask() {
    console.log("Button is clicked to create a new assignment.");

    var modalDiv = document.getElementById("modalDiv");
        var div = document.createElement("div");

            var span = document.createElement("span");
            span.onclick = closeModal;
            span.innerHTML = "&times";
            span.id = "close";

            var taskLabel = document.createElement("label");
            var taskLabelName = document.createTextNode("Assignment Name:");
            taskLabel.appendChild(taskLabelName);
            var taskName = document.createElement("input");
            taskName.type = "text";
            taskName.id = "taskName";
            taskName.placeholder = "Project LXVIII";

            var descLabel = document.createElement("label");
            descLabel.id = "descLabel";
            var descLabelName = document.createTextNode("Assignment Description:");
            descLabel.appendChild(descLabelName);
            var descName = document.createElement("input");
            descName.type="text";
            descName.id = "descName";
            descName.placeholder = "FR Project";

            var assignLabel = document.createElement("label");
            assignLabel.id = "assignLabel";
            var assignLabelName = document.createTextNode("Assigned to:");
            assignLabel.appendChild(assignLabelName);
            var assignName = document.createElement("input");
            assignName.type = "text";
            assignName.setAttribute("list","employees");
            assignName.id = "assignName";

            /* adding Autocomletion of People */
            var dataList = document.createElement("datalist");
            dataList.id = "employees";
            people.map(function(item) {
                var option = document.createElement("option");
                option.value = item;
                dataList.appendChild(option);
                return item;
            });
            /* autocompletion ends here! */

            var prioLabel = document.createElement("label");
            var prioLabelName = document.createTextNode("Assignment Priority:");
            prioLabel.appendChild(prioLabelName);
            var prioName = document.createElement("input");
            prioName.type = "number";
            prioName.id = "prioName";

            var btn = document.createElement("input");
            btn.id = "btnSubmit";
            btn.value = "Submit";
            btn.type = "button";
            btn.style.fontWeight = "bold";
            btn.onclick= submitTask;

        div.id = "modalInnerDiv";
        div.appendChild(span);
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
    modalDiv.appendChild(div);
    modalDiv.style.display = "block";
}

function closeModal() {
    var modalDiv = document.getElementById("modalDiv");
        var div = document.getElementById("modalInnerDiv");
        if(div) {
            div.parentNode.removeChild(div);
        }
    modalDiv.style.display = "none";
}

function submitTask() {
    clearLabels();
    var taskName = document.getElementById("taskName").value;
    var taskDesc = document.getElementById("descName").value;
    var person = document.getElementById("assignName").value;
    var taskPrio = parseInt(document.getElementById("prioName").value);
    var flag = processForm(taskName,taskDesc,taskPrio);
    if(flag) {
        var date = new Date();
         /* feature: {Object Concepts} */
        var time = formatedTime(date);
        var obj = {
            'taskName':taskName,
            'taskDesc':taskDesc,
            'taskAssign':person,
            'taskPrio':taskPrio,
            'createdOn':time,
            'finishedOn':"Not Finished!",
            'status':"todo"
        };
        closeModal();
        console.log("Created Assignment details are:");
        console.log(obj);
        taskList.push(obj);
        taskID += 1;
        todoNewtask(taskID-1);  /* navigated to next js page. */
    }
    else{
        console.log("Warning: All fields are required!!");
    }
}

function clearLabels() {
    var reqLabel;
    reqLabel = document.getElementById("noName");
    if(reqLabel) {
        reqLabel.parentNode.removeChild(reqLabel);
    }
    reqLabel = document.getElementById("noDesc");
    if(reqLabel) {
        reqLabel.parentNode.removeChild(reqLabel);
    }
    reqLabel = document.getElementById("noPrio");
    if(reqLabel) {
        reqLabel.parentNode.removeChild(reqLabel);
    }
    reqLabel = document.getElementById("invalidPrio");
    if(reqLabel) {
        reqLabel.parentNode.removeChild(reqLabel);
    }
}

function processForm(name,desc,prio) {
    function createLabel() {
        var reqLabel = document.createElement("label");
        reqLabel.style.color = "red";
        return reqLabel;
    }
    var status = true;
    var reqLabel, reqPrio;
    if(name === "") {
        console.log("Name of the Task is not entered.");
        var reqName = document.createTextNode("Enter the name of the Assignment!");
        reqLabel = createLabel();
        reqLabel.id = "noName";
        reqLabel.appendChild(reqName);
        document.getElementById("modalInnerDiv").insertBefore(reqLabel,document.getElementById("descLabel"));
        status = false;
    }
    if(desc === "") {
        console.log("Description of the Task is not entered.");
        var reqDesc = document.createTextNode("Enter the description of the Assignment!");
        reqLabel = createLabel();
        reqLabel.id = "noDesc";
        reqLabel.appendChild(reqDesc);
        document.getElementById("modalInnerDiv").insertBefore(reqLabel,document.getElementById("assignLabel"));
        status = false;
    }
    if(isNaN(prio)) {
        console.log("The Task priority isn't assigned yet.");
        reqPrio = document.createTextNode("Priority can't be empty!");
        reqLabel = createLabel();
        reqLabel.id = "noPrio";
        reqLabel.appendChild(reqPrio);
        document.getElementById("modalInnerDiv").insertBefore(reqLabel,document.getElementById("btnSubmit"));
        status = false;
    }
    if(prio <= 0) {
        console.log("The Task priority is invalid.");
        if(prio == 0) {
            reqPrio = document.createTextNode("Priority can't be zero!");
        }
        else{
            reqPrio = document.createTextNode("Priority can't be negative!");
        }
        reqLabel = createLabel();
        reqLabel.id = "invalidPrio";
        reqLabel.appendChild(reqPrio);
        document.getElementById("modalInnerDiv").insertBefore(reqLabel,document.getElementById("btnSubmit"));
        status = false;
    }
    return status;
}

function formatedTime(date) {
    var hrs = date.getHours();
    var mnt = date.getMinutes();
    var sec = date.getSeconds();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yy = date.getFullYear();
    if(dd < 10) {
        dd = '0'+dd;
    }
    if(mm < 10) {
        mm = '0'+mm;
    }
    var obj = {
        'dd':dd,
        'mm':mm,
        'yyyy':yy,
        'hours':hrs,
        'minutes':mnt,
        'seconds':sec
    };
    return obj;
}

window.onclick = function(event) {
    if(event.target.id == "modalDiv") {
        closeModal();
    }
};
