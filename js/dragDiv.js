var player;
function allowDrop(event){
    event.preventDefault();
}
function dropInProg(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    if(player === "todo"){
        beginTask(parseInt(data));
    }
}
function dropDone(event){
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    if(player === "inprogress"){
        finishTask(parseInt(data));
    }
}
