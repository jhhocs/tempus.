chrome.runtime.onStartup.addListener(function() {
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

    var numToDo = storedToDoStuff.length;
    var numChecked = 0;
    for(var i = 0; i < storedToDoStuffChecked.length; i++){
      if(storedToDoStuffChecked[i] == true)
        numChecked++;
    }
    var numRemaining = (numToDo - numChecked).toString();
    if(numRemaining == "0")
      numRemaining = '';
  
    chrome.action.setBadgeText({'text': numRemaining});
});

