const L = require('leaflet')
let locationMap

export default function (id, location) {
  locationMap = L.map(id).setView([51.742, -2.222], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(locationMap);
  
  const center = locationMap.getCenter()
  let marker = L.marker(center, {draggable:true, autoPan: true})
  marker.addTo(locationMap)

  marker.on('dragend', e => {
    location.latlng = marker._latlng
    locationMap.panTo(marker._latlng)
  })
}