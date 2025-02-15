$(document).ready(function(){

    // CSSMap;
    $("#map-continents").CSSMap({
      "size": 430,
      "mapStyle": "vintage",
      "tooltips": "sticky",
      "responsive": "auto",
      "multipleClick": {
        "enable": true,
        "searchUrl": "search.php",
        "searchLink": "",
        "searchLinkVar": "region",
        "separator": "+",
        "hideSearchLink": true,
        "clicksLimit": 0
      },
      "formSupport": {
        "enable": true,
        "inputId": "#demo-input",
        "selectId": "#demo-select",
        "selectLabel": "Location",
        "value": "name"
      }
    });  
  });