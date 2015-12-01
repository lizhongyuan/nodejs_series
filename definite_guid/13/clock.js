/**
 * Created by svenlee on 15/11/13.
 */

function displayTime() {
    var elt = document.getElementById("clock");
    var now = new Date();
    elt.innerHTML = now.toLocaleTimeString();
    setTimeout(displayTime, 1000);
}
window.onload = displayTime;
