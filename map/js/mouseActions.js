/**
 * Responds to the mouse-in event on a map shape (state).
 *
 * @param {?google.maps.MouseEvent} e
 */
function mouseInToRegion(e) {
  // set the hover state so the setStyle function can change the border
  e.feature.setProperty('state', 'hover');

  var percent = (e.feature.getProperty('census_variable') - censusMin) /
    (censusMax - censusMin) * 100;

  // update the label
  document.getElementById('data-label').textContent =
    e.feature.getProperty('NAME');
  document.getElementById('data-value').textContent =
    e.feature.getProperty('census_variable').toLocaleString();
  document.getElementById('data-box').style.display = 'block';
  document.getElementById('data-caret').style.display = 'block';
  document.getElementById('data-caret').style.paddingLeft = percent + '%';
}

/**
 * Responds to the mouse-out event on a map shape (state).
 *
 * @param {?google.maps.MouseEvent} e
 */
function mouseOutOfRegion(e) {
  // reset the hover state, returning the border to normal
  e.feature.setProperty('state', 'normal');
}

function mouseClick(e) {
  console.log(e.feature.getProperty('NAME'));
  if(zoomed){
    map.setCenter(new google.maps.LatLng(40, -100));
    map.setZoom(4);
    zoomed = false;
  }else{
    map.setZoom(7);
    map.setCenter(e.latLng);
    zoomed = true;
  }
  var drawLayer = new google.maps.Data({map:map});
  drawLayer.loadGeoJson('json/l.geojson');
  drawLayer = new google.maps.Data({map:map});
        drawLayer.setStyle(function(feature) {

                  return /** @type {google.maps.Data.StyleOptions} */({
                      fillColor: 'blue',
                      strokeColor: 'blue',
                      strokeWeight: 1.3,
                      fillOpacity:0.7

                  });
                }
              );
  }
