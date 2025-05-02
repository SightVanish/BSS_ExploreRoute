"use client";
import React, { useEffect, useRef } from "react";
import {APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

// Code from: https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js
type Poi ={ key: string, location: google.maps.LatLngLiteral }
    
const locations: Poi[] = [
    {key: 'NYU', location: { lat: 40.7294884, lng: -73.9971899}},
    {key: 'Columbia', location: { lat: 40.8075163, lng: -73.9625729 }},
    {key: 'Cornell Tech', location: { lat: 40.7554526, lng:-73.9564401 }},
];

export default function Googlemap() {
    // Code from: https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js

    
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API || ''} onLoad={() => console.log('Maps API has loaded.')}>
            <div className="w-full h-full border-gray-300">
                <Map
                    defaultZoom={13}
                    defaultCenter={ { lat: 40.749933, lng: -73.98633 } }
                    mapId='explore-map'
                    onCameraChanged={ (ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                    {locations.map((poi: Poi) => (
                        <AdvancedMarker key={poi.key} position={poi.location}>
                            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                        </AdvancedMarker>
                    ))}
                </Map>
            </div>
        </APIProvider>
    )

//   const mapRef = useRef<any>(null);
//   const markerRef = useRef<any>(null);
//   const placePickerRef = useRef<any>(null);
  
//   useEffect(() => {
//     // load google map script
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src = "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
//     document.head.appendChild(script);
    
//     // create api loader
//     const apiLoader = document.createElement("gmpx-api-loader");
//     apiLoader.setAttribute("key", process.env.NEXT_PUBLIC_MAP_API || "");
//     apiLoader.setAttribute("solution-channel", "GMP_GE_mapsandplacesautocomplete_v2");
//     document.body.appendChild(apiLoader);
    
//     const handleInit = async () => {
//       await customElements.whenDefined('gmp-map');
      
//       const map = mapRef.current;
//       const marker = markerRef.current;
//       const placePicker = placePickerRef.current;
      
//       if (map && marker && placePicker) {
//         const infowindow = new google.maps.InfoWindow();
        
//         map.innerMap.setOptions({
//           mapTypeControl: false
//         });
        
//         placePicker.addEventListener('gmpx-placechange', () => {
//           const place = placePicker.value;
          
//           if (!place.location) {
//             window.alert(
//               "No location found for: '" + place.name + "'"
//             );
//             infowindow.close();
//             marker.position = null;
//             return;
//           }
          
//           if (place.viewport) {
//             map.innerMap.fitBounds(place.viewport);
//           } else {
//             map.center = place.location;
//             map.zoom = 17;
//           }
          
//           marker.position = place.location;
//           infowindow.setContent(
//             `<strong>${place.displayName}</strong><br>
//              <span>${place.formattedAddress}</span>
//             `
//           );
//           infowindow.open(map.innerMap, marker);
//         });
//       }
//     };
    
//     document.addEventListener('DOMContentLoaded', handleInit);
    
//     return () => {
//       document.removeEventListener('DOMContentLoaded', handleInit);
//       document.body.removeChild(apiLoader);
//       document.head.removeChild(script);
//     };
//   }, []);
  
//   return (
//     <div className="w-full h-full">
//       <gmp-map 
//         ref={mapRef}
//         center="40.749933,-73.98633" 
//         zoom="13" 
//         map-id="DEMO_MAP_ID"
//         className="w-full h-full"
//       >
//         <div slot="control-block-start-inline-start" className="p-5">
//           <gmpx-place-picker 
//             ref={placePickerRef}
//             placeholder="address"
//           ></gmpx-place-picker>
//         </div>
//         <gmp-advanced-marker ref={markerRef}></gmp-advanced-marker>
//       </gmp-map>
//     </div>
//   );
}