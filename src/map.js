const initiatives = require('../data/initiatives.json')
const L = require('leaflet')
require('leaflet.markercluster')
let carbonExplorer, mappedInitiatives, markers

export default function () {
  carbonExplorer = L.map('explore').setView([51.742, -2.222], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(carbonExplorer);

  markers = L.markerClusterGroup()

  mappedInitiatives = initiatives.map(initiative => {
    var marker = L.marker(initiative.location.latlng)
    marker.bindPopup(`<h1>${initiative.name}</h1>
          <p>${initiative.summary}</p>
          <p>Status: ${initiative.status}</p>
          <p>Sector: ${initiative.sector}</p>
          <p>Theme: ${initiative.theme}</p>
          <p>Solution: ${initiative.solution}</p>
           `)
    markers.addLayer(marker)
    return {
      initiative,
      marker,
    }
  })
  carbonExplorer.addLayer(markers)
}

window.exploreMap = {
  filter: function (attribute, value) {
    mappedInitiatives.forEach(init => markers.removeLayer(init.marker))

    mappedInitiatives.filter(init => {
      return init.initiative[attribute] === value
    }).forEach(init => {
      markers.addLayer(init.marker)
    })
  },

  showAll: function () {
    mappedInitiatives.forEach(init => {
      markers.addLayer(init.marker)
    })
  },

  getCenter: function () {
    console.log(carbonExplorer.getCenter())
  }
}