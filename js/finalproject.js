"use strict";

/* The requirements I went for were the DOM creation/manipulation, the event handlers, the JSON object, and the form validation

For the DOM Element creation, you can see whre I'm creating the element "option" and appending text nodes to it in the selects

For the event handlers, there is the blur handlers that handle the format of the date and time as well as the onkeypress handler
that takes care of the charcount for the description

For the JSON, I initially tried to store all the data but was struggling so I decided that for me personally, my mileage was the most
important thing to store as a runner. Thus, I created a saveMileage button that saved the mileage everytime you pressed it.

Lastly, for my form, I had "requireds" within the HTML as well as designated formats to follow for the date and time using
regular expressions.
*/

window.onload = function(){
  activitySelect();
  description();
  date();
  time();
  writeMileage();
}

var entries = []; //array to be used in saving and writing our mileage

function activitySelect() {
  //setting up variables and lists
  var activitySelect = document.getElementById("activity"); //initialize list and grabs elements
  var primaryItems = ["Run", "Swim", "Bike", "Lift", "Other"];
  var distance = document.getElementById("distance");

  //creates list of activities iterating thorugh the primaryItems, making an element option,adding a text node to interval
  //and appending the option back to activitySelect.
  for(var i = 0; i < primaryItems.length; i++){
    var option = document.createElement("option");
    var tn = document.createTextNode(primaryItems[i]);
    option.appendChild(tn);
    activitySelect.appendChild(option);
  }
  //change handler to hide distance if the workout isn't a cardio activity
  activitySelect.addEventListener("change", function(e){
    var selectedOption = activitySelect.options[activitySelect.options.selectedIndex];//gets our choice from list above

    if(selectedOption.value == "Run" || selectedOption.value == "Bike" || selectedOption.value == "Swim"){//shows distance if option is here
      distance.style.display = "block";
    }else if(selectedOption.value = "Lift" || selectedOption.value == "Other"){// hides it if option is here
      distance.style.display = "none";
    }
  });
}

function date(){
  var date = document.getElementById("date");

  function formatDate(el) {
      var dateNbr = el.value.trim(); //gets rid of whitespace

      var cleanNbr = dateNbr.replace(/[^\d]/g, ''); //gets rid of characters besides numbers

      var formattedNbr = cleanNbr.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3'); //formats number with dashes

      el.value = formattedNbr;//updates our value of el
  }

  date.addEventListener('blur', function() {//on blur handler
  	var val = this.value;

  	if (val.replace(/[^0-9]/g,'').length == 8) {//checks how many numbers regardless of extra chars, if len == 8 runs
  		if (! val.match(/\d{2}-\d{2}-\d{4}/)) {//if it isn't in the correct format, it does it automatically
  			formatDate(this);
  		}
    } else {
  	  alert('Please enter a valid date (dd/mm/yyyy).'); //if not correct amount of numbers, alert runs
    }
  });
}

function time(){
  var time = document.getElementById("time");

  function formatTime(el) {
      var timeNbr = el.value.trim(); //gets rid of whitespace

      var cleanNbr = timeNbr.replace(/[^\d]/g, ''); //gets rid of characters besides numbers

      var formattedNbr = cleanNbr.replace(/(\d{1})(\d{2})(\d{2})/, '$1:$2:$3'); //formats number with colons

      el.value = formattedNbr;//updates our value of el
  }

  time.addEventListener('blur', function() {//on blur handler
  	var val = this.value;

  	if (val.replace(/[^0-9]/g,'').length == 5) {//checks how many numbers regardless of extra chars. if len == 5, runs
  		if (! val.match(/\d{1}:\d{2}:\d{2}/)) {//if it isn't in the correct format, it does it automatically
  			formatTime(this);
  		}
    } else {
  	  alert('Please enter a valid time.'); //if not 5 numbers, alert runs
    }
  });
}



function description(){
  //get vars
  var txt = document.getElementById("description");
  var charsLeft = document.getElementById("charsLeft");

  //eventlister for any keypress in the textarea
  txt.addEventListener("keypress", function(e){
      charsLeft.innerHTML = (750 - this.value.length); //if key is pressed,
      if(this.value.length > 750){
        e.preventDefault();
      }
  });
}

function saveMileage(){
  var distance = document.getElementById("distance"); //get distance
  entries.push(distance.value); //add to our array

  var JSONentries = JSON.stringify(entries);//stringify it

  localStorage.setItem("mileage", JSONentries); //store it
}

function writeMileage(){
  var entriesFromStorage = localStorage.getItem("mileage");//pull our items out of storage

  if(entriesFromStorage !== null){//if not empty
    entriesFromStorage = JSON.parse(entriesFromStorage);//parse the data
    for(var key in entriesFromStorage){//iterate through the parsed data
      document.getElementById("output").innerHTML += entriesFromStorage[key] + " miles,  ";//output it to our page
      entries.push(entriesFromStorage[key]);//update our entries.
    }
  }
}
