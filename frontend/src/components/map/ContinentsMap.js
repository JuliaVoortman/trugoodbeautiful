import React, { useEffect, useRef } from 'react';

function ContinentsMap() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
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
    `;

    mapContainer.current.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div id="map-continents" ref={mapContainer}>
      <ul className="continents">
        <li className="c1"><a href="#africa">Africa</a></li>
        <li className="c2"><a href="#asia">Asia</a></li>
        <li className="c3"><a href="#australia">Australia</a></li>
        <li className="c4"><a href="#europe">Europe</a></li>
        <li className="c5"><a href="#north-america">North America</a></li>
        <li className="c6"><a href="#south-america">South America</a></li>
      </ul>
    </div>
  );
}

export default ContinentsMap;