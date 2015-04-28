var MTV = MTV || {};

(function(ctx) {
  ctx.map = undefined;
  ctx.marker = undefined;
  ctx.infoWindow = undefined;
  
  ctx.initialize = function() {
  var mapCanvas = document.getElementById('map');
  var storeLatLang = new google.maps.LatLng(40.641542, -73.936557);
  var mapOptions = {
    center: storeLatLang,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.SATTELLITE,
    backgroundColor: "white",
    mapMarker: true
  };
  
  // global so that it can be accessed and refreshed when location section loads
  ctx.map = new google.maps.Map(mapCanvas, mapOptions);

  var styles = [{ "featureType" :"landscape",
            "elementType" :"geometry.fill",
            "stylers"     :[{"color":"#d3d3d3"}]},
          { "featureType" :"landscape",
            "elementType" :"geometry.stroke",
            "stylers"     :[{"color":"#ffffff"}]},
          { "featureType" :"poi",
            "elementType" :"labels.icon",
            "stylers"     :[{"saturation":-96}]}
          ];
  ctx.map.setOptions({styles: styles});
  
  var contentString = "<h1>Murry's True Value Hardware</h1>" +
  '<p>4214 Avenue D</p>' +
  '<p>Brooklyn, NY 11203</p>';
  ctx.infoWindow = new google.maps.InfoWindow({
    content: contentString
  });
 
  ctx.marker = new google.maps.Marker({
    position: ctx.map.getCenter(),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: '#FF0000',
      strokeOpacity: 0.5,
      strokeWeight: 30,
      fillColor: 'black',            
      fillOpacity: 0.5,
      scale: 3
    },
    map: ctx.map
  });
  // Displays infoWindow whem marker is clicked
  google.maps.event.addListener(ctx.marker, 'click', function() {
    ctx.infoWindow.open(ctx.map, ctx.marker);
  });
  // Shows infoWindow when map initialized
  ctx.infoWindow.open(ctx.map, ctx.marker);
}
})(MTV);

google.maps.event.addDomListener(window, 'load', MTV.initialize); 