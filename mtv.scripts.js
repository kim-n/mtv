console.log("event.scripts.js loaded")
/*
  Assumes that MTV.map, MTV.marker, MTV.infoWindow is defined.
*/

$("#map").on("click", function(e) {
  if ($("#map-wraper").hasClass("wraper-expanded")) {
    e.stopPropagation();
  }
});

$("#map-wraper").on("click", function(e) {
  $(this).toggleClass("wraper-expanded");
  google.maps.event.trigger(MTV.map, "resize");
  MTV.map.setCenter(new google.maps.LatLng(40.641542, -73.936557));
}); 

$(".nav-btn").on("click", function (e) {

  var new_section_id = $(this).attr("id").slice(0,-4);
  var new_section = $("#" + new_section_id);
  var cur_section = $(".focus"); // undefined, about, contact, location, hours
  var cur_section_id = cur_section.attr('id');
 
  // if click 'True Value,' follows link.
  if(new_section_id === "truevalue") {
    window.open("http://www.truevalue.com/");
    return;
  }
  
  // remove focus from current section shift-top css class if present
  // in preparation for adding focus to a new section
  if (cur_section_id !== undefined){
    // if current_section is same as new_section, no action necessary
    if(cur_section_id === new_section_id){
      return;
    }
    cur_section.removeClass('focus').removeClass('shift-top');
  }
  

  
  // if cur_section_id is undefined, cur_section_id > new_section_id == false
  if (cur_section_id > new_section_id) {
    new_section.addClass('shift-top');
  }
  // wait 10 milliseconds to ensure (if necessary) section is moved to 
  // top by prev statement before sliding into position
  setTimeout(function(){
    new_section.addClass('focus');
  }, 10);
  // fix: when google map changes size, doesn't automatically refocus center
  if (new_section_id == "contact"){
    // wait 10 milliseconds to ensure section becomes in focus before map refresh
    setTimeout(function(){
      google.maps.event.trigger(MTV.map, "resize");
      MTV.map.setCenter(new google.maps.LatLng(40.641542, -73.936557));
      MTV.infoWindow.open(MTV.map, MTV.marker);
    }, 10);
  }
});