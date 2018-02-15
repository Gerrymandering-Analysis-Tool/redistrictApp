/**
 * Loads the census data from a simulated API call to the US Census API.
 *
 * @param {string} variable
 */
function loadCensusData(variable) {
  // load the requested variable from the census API (using local copies)
  var xhr = new XMLHttpRequest();
  xhr.open('GET', variable + '.json');
  xhr.onload = function() {
    var censusData = JSON.parse(xhr.responseText);
    censusData.shift(); // the first row contains column names
    censusData.forEach(function(row) {
      var censusVariable = parseFloat(row[0]);
      var stateId = row[1];

      // keep track of min and max values
      if (censusVariable < censusMin) {
        censusMin = censusVariable;
      }
      if (censusVariable > censusMax) {
        censusMax = censusVariable;
      }

      // update the existing row with the new data
      map.data
        .getFeatureById(stateId)
        .setProperty('census_variable', censusVariable);
    });

    // update and display the legend
    document.getElementById('census-min').textContent =
      censusMin.toLocaleString();
    document.getElementById('census-max').textContent =
      censusMax.toLocaleString();
  };
  xhr.send();
}

/** Removes census data from each shape on the map and resets the UI. */
function clearCensusData() {
  censusMin = Number.MAX_VALUE;
  censusMax = -Number.MAX_VALUE;
  map.data.forEach(function(row) {
    row.setProperty('census_variable', undefined);
  });
  document.getElementById('data-box').style.display = 'none';
  document.getElementById('data-caret').style.display = 'none';
}
