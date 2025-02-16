$(document).ready(function(){
      // CSSMap;
      $("#map-continents").CSSMap({
        "size": 750,
        "tooltips": "visible",
        "responsive": "auto",
        "visibleList": {
          "enable": true,
          "listPosition": "bottom",
          "columns": 3,
          "columnsGap": 20,
          "columnWidth": 200,
        },
        "multipleClick": {
        "enable": true,
        "searchUrl": "search.php",
        "searchLink": "",
        "searchLinkVar": "region",
        "separator": "+",
        "hideSearchLink": true,
        "clicksLimit": 0
      }
      });
  });
