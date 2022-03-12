//chrome.runtime.onStartup.addListener(function() {
chrome.tabs.onUpdated.addListener(function() {
  console.log("1");
  if(localStorage.getItem("toDoList") == null){
    console.log("2");
    var storedToDoStuff = [];
  }
  else{
    console.log("3");
    var storedToDoStuff = JSON.parse(localStorage.getItem("toDoList"));
  }
  
  chrome.action.setBadgeText({'text': '1'});
})