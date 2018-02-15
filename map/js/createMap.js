var mapStyle = [{
  'stylers': [{
    'visibility': 'on'
  }]
}, {
  'featureType': 'landscape',
  'elementType': 'geometry',
  'stylers': [{
    'visibility': 'on'
  }, {
    'color': '#fcfcfc'
  }]
}, {
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [{
    'visibility': 'on'
  }, {
    'color': '#bfd4ff'
  }]
}];
var map;
var zoomed;
var censusMin = Number.MAX_VALUE,
  censusMax = -Number.MAX_VALUE;

function initMap() {

  // load the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40,
      lng: -100
    },
    zoom: 4,
    styles: mapStyle
  });


  // set up the style rules and events for google.maps.Data
  map.data.setStyle(styleFeature);
  map.data.addListener('mouseover', mouseInToRegion);
  map.data.addListener('mouseout', mouseOutOfRegion);
  map.data.addListener('click', mouseClick);




  // wire up the button
  var selectBox = document.getElementById('census-variable');
  google.maps.event.addDomListener(selectBox, 'change', function() {
    clearCensusData();
    loadCensusData(selectBox.options[selectBox.selectedIndex].value);
  });

  // state polygons only need to be loaded once, do them now
  loadMapShapes();

}

/** Loads the state boundary polygons from a GeoJSON source. */
function loadMapShapes() {
  // load US state outline polygons from a GeoJson file
  map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/states.js', {
    idPropertyName: 'STATE'
  });

  // wait for the request to complete by listening for the first feature to be
  // added
  google.maps.event.addListenerOnce(map.data, 'addfeature', function() {
    google.maps.event.trigger(document.getElementById('census-variable'),
      'change');
  });
}
