var myNodelist = document.getElementsByTagName("LI");
var i;
var toDoCounter=-1;
var toDoStuff = [];
var toDoStuffClosed = [];
var toDoStuffChecked = [];
if(localStorage.getItem("toDoList") == null){
	var storedToDoStuff = [];
}
else{
	var storedToDoStuff = JSON.parse(localStorage.getItem("toDoList"));
}
if(localStorage.getItem("toDoListChecked") == null){
	var storedToDoStuffChecked = [];
}
else{
	var storedToDoStuffChecked = JSON.parse(localStorage.getItem("toDoListChecked"));
}

for (i = 0; i < myNodelist.length; i++) {
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;

var list = document.querySelector('ul.todo');
let curEditing;
let asdf;

// CHECKS FOR DOUBLE CLICK. IF SINGLE CLICK SET TO CHECKED
list.addEventListener('click', (event) => {
	if (event.target.tagName === 'LI' && !event.target.isContentEditable) {
		event.target.setAttribute("contenteditable", "plaintext-only");
		event.target.getElementsByClassName("close")[0].setAttribute("contenteditable", false);
		const temp = setTimeout(function() {
			event.target.setAttribute("contenteditable", false);
			event.target.classList.toggle('checked');
			saveChecked();
		}, 175);
		list.addEventListener('click', () => {
			clearTimeout(temp);
			curEditing = event.target;
		});
	}
}, false);

// CHECK IF EDITED TEXT IS EMPTY
list.addEventListener("keydown", (e) => {
	console.log(curEditing.textContent);
	if (e.keyCode == 8 || e.keyCode == 46) { // delete and del keys
		if (curEditing.textContent.length <= 2) { // last inner element 
			
			e.preventDefault()
		} 
	}
});

const button = document.querySelector('button');

button.addEventListener('click', () => {
	newElement();
});

var input = document.getElementById("myInput");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
   event.preventDefault();
   newElement();
  }
});

function closeElement() {
	for (var i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			let obj = this;
			div.classList.add('grow');
			setTimeout(function () {
				div.remove(obj);
				toDoStuffClosed[toDoStuffClosed.length] = obj.id;
				var count = 0;
				for(var j = 0; j < toDoStuffClosed.length; j++){
					if(obj.id>toDoStuffClosed[j]){
						count++;
					}
				}
				toDoStuff.splice(obj.id-count,1);
				localStorage.setItem("toDoList", JSON.stringify(toDoStuff));
				saveChecked();
			}, 250);
		}
	}
}

function newElement() {
	var li = document.createElement("li");
	var inputValue = document.getElementById("myInput").value;
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue != '') {
		document.getElementById("myUL").appendChild(li);
		toDoStuff[toDoStuff.length] = inputValue;
		li.classList.add('grow');
		setTimeout(function () {
			li.classList.remove('grow');
		}, 10);
		console.log(toDoStuff);
		toDoCounter++;
		localStorage.setItem("toDoList", JSON.stringify(toDoStuff));
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.id = toDoCounter;

	span.appendChild(txt);
	li.appendChild(span);

	closeElement();
	setBadge();
}

for(var z=0;z<storedToDoStuff.length;z++){
	var li = document.createElement("li");
	var inputValue = storedToDoStuff[z];
	var t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === '') {
	} else {
		document.getElementById("myUL").appendChild(li);
		toDoStuff[toDoStuff.length] = inputValue;
		console.log(toDoStuff);
		toDoCounter++;
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.id = toDoCounter;

	span.appendChild(txt);
	li.appendChild(span);

	closeElement();
}

var prevList = document.getElementsByTagName("li");
for (var i = 0; i < storedToDoStuffChecked.length; i++) {
	if(storedToDoStuffChecked[i] === true){
		prevList[i].className = "checked";
		console.log(prevList[i]);
	}
}

function saveChecked() {
	var items = document.getElementsByTagName("li");
	toDoStuffChecked = [];
	for (var i = 0; i < items.length; i++) {
		if(items[i].classList.contains("checked")){
			toDoStuffChecked[i] = true;
		}
		else{
			toDoStuffChecked[i] = false;
		}
	}
	setBadge();
	localStorage.setItem("toDoListChecked", JSON.stringify(toDoStuffChecked));
}

function setBadge(){
	var numToDo = toDoStuff.length;
	var numChecked = 0;
	for(var i = 0; i < toDoStuffChecked.length; i++){
		if(toDoStuffChecked[i] == true)
			numChecked++;
	}
	var numRemaining = (numToDo - numChecked).toString();
	if(numRemaining == "0")
		numRemaining = '';

	chrome.action.setBadgeText({'text': numRemaining});
}



if (typeof(Storage) != "undefined") {
    var colorId = localStorage.getItem("lastColor");
    changeColor(colorId);
}


/* COLOR CHANGE BUTTONS */
var backdrop = document.getElementById("CCBBackdrop");
var cCBHolder = document.getElementById("CCBHolder");
var btn = document.getElementById("colorChangeBtn");

document.getElementById('colorChangeBtn').addEventListener('click', e => {
    backdrop.style.display = "block";
    backdrop.classList.add('grow');
    cCBHolder.classList.add('grow');
});

window.addEventListener('click', e => {
	// Close Color Change Button Element
    if (e.target == backdrop) {
        backdrop.classList.remove('grow');
        cCBHolder.classList.remove('grow');
    }

	// Stop Editing Text
	if (e.target != curEditing && curEditing != null) {
		console.log(curEditing.textContent);
		if(curEditing.textContent == ''){
			console.log("asdf");
			closeElement();
		}
		curEditing.setAttribute("contenteditable", false);
		curEditing = null;
		console.log(curEditing);
	}
});

const colorButtons = [...document.querySelectorAll('.colorChangeBtns')];
document.addEventListener('click', e => {
    var colorId = e.target.id;
    if (!colorButtons.includes(e.target)) return;
    if(colorId.length>6)
        colorId = colorId.substring(1);
    changeColor(colorId);

    localStorage.setItem('lastColor', colorId);
});

function changeColor(colorId) {
    var backgroundColor = document.getElementById("wholepage");
    var outsideBtn = document.getElementById("colorChangeBtn");
    switch(colorId) {
        case "FF9999":
            backgroundColor.style.background = "#FFC8C8";
            outsideBtn.style.background = "#" + colorId;
            toDoHeader.style.color = "#EF7070";
            topbar.style.background = "#FF9999";
            break;
        case "FFCF87":
            backgroundColor.style.background = "#FFE9C9";
            outsideBtn.style.background = "#FFCF87";
            toDoHeader.style.color = "#F1B151";
            topbar.style.background = "#FFCF87";
            break;
        case "99DA83":
            backgroundColor.style.background = "#DAF2D1";
            outsideBtn.style.background = "#99DA83";
            toDoHeader.style.color = "#7FBD6A";
            topbar.style.background = "#99DA83";
            break;
        case "93D7E6":
            backgroundColor.style.background = "#D6E7EB";
            outsideBtn.style.background = "#93D7E6";
            toDoHeader.style.color = "#55A9BB";
            topbar.style.background = "#93D7E6";
            break;
        case "C8A8F2":
            backgroundColor.style.background = "#E1D9EB";
            outsideBtn.style.background = "#C8A8F2";
            toDoHeader.style.color = "#9673C1";
            topbar.style.background = "#C8A8F2";
            break;
        case "505050":
            backgroundColor.style.background = "#232323";
            outsideBtn.style.background = "#505050";
            toDoHeader.style.color = "#FFFFFF";
            topbar.style.background = "#505050";
			hexToDec("#a32323");
			break;
		case "FFFFFF":
			var currentTime = new Date();
			var hours = currentTime.getHours();
			var minutes = currentTime.getMinutes();
			if (5 <= hours && hours < 8) {//Morning
				backgroundColor.style.background = "#3B4371";
				outsideBtn.style.background = "#F3904F";
				toDoHeader.style.color = "#3B4371";
				topbar.style.background = "#F3904F";
			}
			if (8 <= hours && hours < 17) {//Day
				backgroundColor.style.background = "#0083B0";
				outsideBtn.style.background = "#00B4DB";
				toDoHeader.style.color = "#0083B0";
				topbar.style.background = "#00B4DB";
			}
			if (17 <= hours && hours < 19) {//Evening
				backgroundColor.style.background = "#C06C84";
				outsideBtn.style.background = "#355C7D";
				toDoHeader.style.color = "#C06C84";
				topbar.style.background = "#355C7D";
			}
			if (19 <= hours || hours < 5) {//Night
				backgroundColor.style.background = "#0f2027";
				outsideBtn.style.background = "#2c5364";
				toDoHeader.style.color = "#0f2027";
				topbar.style.background = "#2c5364";
			}

    }
}

function decToHex(r, g, b) {

}

function toHex(input) {

}

function hexToDec(hex) {
	var r, g, b;
	r = hex.substring(1, 3);
	g = hex.substring(3, 5);
	b = hex.substring(5, 7);
	console.log(`${r} ${g} ${b}`);
	toNum(r);

}

function toNum(input) {
	
}
