$(document).ready(function(){

  // CSSMap;
  $("#map-continents").CSSMap({
    "size": 430,
    "mapStyle": "vintage",
    "tooltips": "sticky",
    "responsive": "auto",
    "formSupport": {
      "enable": true,
      "inputId": "#demo-input",
      "selectId": "#demo-select",
      "selectLabel": "Location",
      "value": "name"
    }
  });
  // END OF THE CSSMap;
  
  });