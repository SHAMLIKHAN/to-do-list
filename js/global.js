var user;
function getUser() {
    user = localStorage.getItem('user');
    console.log(user);
    document.getElementById("user").innerHTML = user || "User";
}
