let usCenterCoordinates = [40.34, -96.46]
let zoomLevel = 3
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let map = L.map('bridge-map').setView(usCenterCoordinates, zoomLevel)

let bridgeIcon = L.icon({
    iconUrl: 'bridge.png',

    iconSize: [20, 50],
    iconAnchor: [15, 50],
    popupAnchor: [-10, -76]
})

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    id:'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibGFuZWVuZ2V0IiwiYSI6ImNrNmxpZ2hnbzBmZ3UzbW55bmF3NHpzZ2oifQ.YYa8_BJfRVs1z7y4bORVag'
}).addTo(map)

let bridges = [
    {'name': 'Verrazano-Narrows Bridge', 'place': 'New York, NY', 'span': 1298.4, 'location': [40.61, -74.04]},
    {'name': 'Golden Gate Bridge', 'place': 'San Francisco and Marin, CA', 'span': 1280.2, 'location': [37.82, -122.48]},
    {'name': 'Mackinac Bridge', 'place': 'Mackinaw and St. Ignace, MI', 'span': 1158.0, 'location': [45.82, -84.73]},
    {'name': 'George Washington Bridge', 'place': 'New York, NY and New Jersey, NJ', 'span': 1067.0, 'location': [40.85, -73.95]},
    {'name': 'Tacoma Narrows', 'place': 'Tacoma and Kitsap, WA', 'span': 853.44, 'location': [47.27, -122.55]}
];

console.log(canvas)
bridgesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [
            {
                data: [],
                backgroundColor: []
            }
        ],
        labels: []
    }
});

bridges.forEach(function(element){
    let loopMarker = L.marker(element.location, {icon: bridgeIcon})
        .bindPopup(`"${element.name}<br>${element.place}<br>${element.span} meters long"`)
        .addTo(map)

    bridgesChart.data.labels.push(element.name)
    bridgesChart.data.datasets[0].data.push(element.span)

    bridgesChart.update()
})